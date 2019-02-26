import React, { Component } from 'react'
import { incrementAction, decrementAction } from '../actions'
import { selectProductItem, selectIdItem } from '../util'
import { connect } from 'react-redux'

const CartItem = ({ products, cartItem, add, subtract, stock }) => {
  const productItem = selectProductItem(products, cartItem.productId)
  const stockItem = selectIdItem(stock, cartItem.productId)
  return <div className='cart-item' data-productId={cartItem.productId}>
    <div className='item-view'>
      <div className='item__features'>
        <h5>{productItem.name}</h5>
      </div>
    </div>
    <div className='item-value'>
      <div className='item__prize'>
        <span className='prize'>prize</span>
        <span className='value'>{productItem.prize} x {cartItem.amount} = {(productItem.prize * cartItem.amount).toFixed(2)}</span>
      </div>
      <div className='item-buttons'>
        <span className='units'>units</span>
        <span className='buttons'>
          <button data-add className={'add' + (stockItem.stock === 0 ? 'disabled' : '')} onClick={add}>+</button>
          <span className='amount'>{cartItem.amount}</span>
          <button data-subtract className='subtract' onClick={subtract}>-</button>
        </span>
      </div>
      {stockItem.stock === 0 && <div className='no-stock'>Out of existences</div>}
    </div>
  </div>
}

class Cart extends Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: true }
    this.shipmnetCost = 3
  }
  componentDidMount () {
    window.addEventListener('resize', this.onresize)
  }
  onresize () {
    return () => {
      if (window.innerWidth > 768) {
        this.setState({ isopen: true })
      } else {
        this.setState({ isOpen: false })
      }
    }
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
  render () {
    return <div className='cart-wraper'>
      <span className='cart-icon' onClick={e => this.setState({ isOpen: !this.state.isOpen })}>&#128722;<sapn className='items'>{this.props.cart.length}</sapn></span>
      {this.isOpen && <div className='cart'>

        {this.props.cart.map((e, i) => <CartItem add={this.increment(e.productId)} subtract={this.decrement(e.productId)} cartItem={e} key={i} products={this.props.products} stock={this.props.stock} />)}
        {!this.props.cart.length && <p className='empty-cart'>The cart is empty</p>}
        <div className='items-total'>
          <span className='label'>Total cart value</span>
          <span className='value'>{this.calcTotal().toFixed(2)} $</span>
        </div>
        <div className='shipment'>
          <span className='label'>shipment cost</span>
          <span className='value'>{this.shipmnetCost.toFixed(2)} $</span>
        </div>
        <div className='order-total'>
          <span className='label'>total cost order</span>
          <span className='value'>{(this.calcTotal() + this.shipmnetCost).toFixed(2)} $</span>
        </div>

        <span className='checkout-button'>checkout</span>

      </div>}
      <style jsx>{`
        .cart-icon {
          cursor: pointer
          font-size: 1.6rem;
        }
      
      `}</style>
    </div>
  }
}
const mapStateToProps = state => ({ cart: state.cart, stock: state.stock, products: state.products })
export default connect(mapStateToProps)(Cart)
