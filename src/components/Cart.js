import React, { Component } from 'react'
import { incrementAction, decrementAction, checkOut } from '../actions'
import { selectProductItem, selectIdItem } from '../util'
import { connect } from 'react-redux'
import { history } from './index'
import store from '../store'

const CartItem = ({ products, cartItem, add, subtract, stock }) => {
  const productItem = selectProductItem(products, cartItem.productId)
  const stockItem = selectIdItem(stock, cartItem.productId)
  return <div className='cart-item' data-testid={'data-item-' + productItem.name}>
    <div className='item-view'>
      <div className='item-features'>
        <img src='https://via.placeholder.com/50' alt='' />
        <h5>{productItem.name}</h5>
      </div>
      <div className='item-value'>
        <div className='item-prize'>
          <span className='prize'>prize </span>
          <span className='value'>{productItem.prize} $ x {cartItem.amount} = {(productItem.prize * cartItem.amount).toFixed(2)} $</span>
        </div>
        <div className='item-buttons'>
          <span className='units'>units</span>
          <span className='buttons'>
            <button data-add disabled={(stockItem.stock === 0 ? 'disabled' : '')} className='add' onClick={add}>+</button>
            <span className='amount'>{cartItem.amount}</span>
            <button data-subtract className='subtract' onClick={subtract}>-</button>
          </span>
        </div>
        {stockItem.stock === 0 && <div className='no-stock'>Out of existences</div>}
      </div>
    </div>

    <style jsx>{`
    .cart-item {
      font-size: 1.6rem;
      padding: .6rem 0;
    }
    .item-view {
      display: flex;
      align-items: center;
      border: 1px solid var(--primary-color);
      padding: 1rem;
      border-radius: 3px;
    }
    .item-value > * {
      padding: .6rem 0;
    }
    .item-features {
      text-align: center;
      margin-right: 3rem;
    }
    .item-features img {
      margin-top: 2rem;
    }
    .item-features h5 {
      font-size: 1.6rem;
      margin: 0;
      line-height: 1.6;
    }
     .units {
       display: inline-block;
       margin-right: .6rem;
     }
     .buttons > * {
       display: inline-blocK;
       padding: .6rem;
     }
     .buttons .add, .buttons .subtract {
       
       cursor: pointer;
     }
    
    `}</style>
  </div>
}

class Cart extends Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }
    this.shipmnetCost = 3
  }

  increment (id) {
    return (e) => {
      const stockItem = selectIdItem(this.props.stock, id)
      if (stockItem.stock > 0) {
        this.props.dispatch(incrementAction(id))
      }
    }
  }
  decrement (id) {
    return (e) => this.props.dispatch(decrementAction(id))
  }
  calcTotal () {
    const total = this.props.cart.reduce((acum, item) => {
      let productItem = selectProductItem(this.props.products, item.productId)
      let totalCost = Number.parseFloat(productItem.prize) * item.amount + acum
      return totalCost
    }, 0)
    return total
  }
  checkOut () {
    return () => {
      if (!this.props.cart.length) return
      history.push('/checkout')
      store.dispatch(checkOut())
    }
  }
  render () {
    return <div className='cart-wrapper' >
      <span className='cart-icon' onClick={e => this.setState({ isOpen: !this.state.isOpen })}>&#128722;<span className='cart-items'>{this.props.cart.length}</span></span>
      {this.state.isOpen && <div className='cart' data-testid='cart'>

        {this.props.cart.map((e, i) => <CartItem add={this.increment(e.productId)} subtract={this.decrement(e.productId)} cartItem={e} key={i} products={this.props.products} stock={this.props.stock} />)}
        {!this.props.cart.length && <p className='empty-cart'>The cart is empty</p>}
        <div className='pay-breakdown'>
          <div className='order-inputs'>
            <span className='label'>Total cart value </span>
            <span data-testid='cart-total' className='value'>{this.calcTotal().toFixed(2)} $</span>
          </div>
          <div className='order-inputs'>
            <span className='label'>shipment cost </span>
            <span className='value'>{this.shipmnetCost.toFixed(2)} $</span>
          </div>
          <div className='order-inputs'>
            <span className='label'>total cost order </span>
            <span className='value'>{(this.calcTotal() + this.shipmnetCost).toFixed(2)} $</span>
          </div>

          <div className='checkout-wrapper'>
            <span onClick={this.checkOut()} className='checkout-button'>checkout</span>
          </div>

        </div>

      </div>}
      <style jsx>{`
        .cart-wrapper {
          width: 100%;
          font-size: 1.6rem;
          position: relative;
          display: flex;
          padding-top: 2rem;
        }
        
        .cart-icon {
          cursor: pointer;
          font-size: 3.6rem;
          position: relative;
          margin-left: auto;
          margin-right: 2rem;
        }
        .cart {
          position: absolute;
          z-index: 1;
          background: white;
          box-shadow: 0 0 9px 0px #e3dddd;
          padding: 2rem;
          right: 2rem;
          top: 6.5rem;
        }
        .cart-items {
          position: absolute;
          font-size: 1.6rem;
          top: 3px;
          right: -18px;
          color: white;
          text-align: center;
          display: inline-block;
          width: 20px;
          height: 20px;
          background: red;
          border-radius: 50%;
          line-height: 20px;
        }
        .pay-breakdown {
          width: 70%;
          margin: 2rem auto 0;

        }
        .order-inputs {
          display: flex;
        }
        
        .order-inputs > .value {
          margin-left: auto;
        }
        .checkout-wrapper {
          text-align: center;
          margin-top: 2rem;
        }
        .checkout-button {
          padding: .6rem 1.2rem;
          background: hsl(50, 80%, 52%);;
          cursor: pointer;
        }
        div[class*="order"] {
          margin: .6rem 0;
        }
      `}</style>
    </div>
  }
}
const mapStateToProps = state => ({ cart: state.cart, stock: state.stock, products: state.products })
export default connect(mapStateToProps)(Cart)
