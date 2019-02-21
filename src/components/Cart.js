import React, { Component } from 'react'
import { incrementAction, decrementAction } from '../actions'
import { selectIdItem } from '../util'
import { connect } from 'react-redux'

const CartItem = ({ products, cartItem, add, subtract, noStock }) => {
  const productItem = selectIdItem(products, cartItem.productId)

  return <div className='cart-item'>
    <div className='item-view'>
      <div className='item__features'>
        <h5>{productItem.name}</h5>
      </div>
    </div>
    <div className='item-value'>
      <div className='item__prize'>
        <span className='prize'>prize</span>
        <span className='value'>{productItem.prize}</span>
      </div>
      <div className='item-buttons'>
        <span className='units'>units</span>
        <span className='buttons'>
          <span className='add' onClick={add(cartItem.productId)}>+</span>
          <span className='value'>{cartItem.amount}</span>
          <span className='subtract' onClick={subtract(cartItem.productId)}>-</span>
        </span>
      </div>
      {noStock && <div className='no-stock'>Out of existences</div>}
    </div>
  </div>
}

class Cart extends Component {
  constructor (props) {
    super(props)
    this.state = { noStock: false }
    this.shipmnetCost = 3
  }

  increment (id) {
    return (e) => {
      const stockItem = selectIdItem(this.props.stock, id)
      if (stockItem.stock > 0) {
        this.props.dispatch(incrementAction(id))
        this.setState({ noStock: false })
      } else {
        this.setState({ noStock: true })
      }
    }
  }
  decrement (id) {
    return (e) => this.props.dispatch(decrementAction(id))
  }
  calcTotal () {
    const total = this.props.cart.reduce((acum, item) => {
      let productItem = selectIdItem(this.props.products, item.productId)
      let totalCost = parseInt(productItem.prize, 10) + acum
      return totalCost
    }, 0)
    return total
  }
  render () {
    return <div className='cart'>

      {this.props.cart.map((e, i) => <CartItem add={this.increment} subtract={this.decrement} cartItem={e} index={i} products={this.props.products} noStock={this.state.noStock} />)}

      <div className='shipment'>
        <span className='label'>shipment cost</span>
        <span className='value'>{this.shipmnetCost} $</span>
      </div>
      <div className='total-amount'>
        <span className='label'>Total payment</span>
        <span className='value'>{this.calcTotal().toFixed(2)} $</span>
      </div>
      <span className='checkout-button'>checkout</span>

    </div>
  }
}
const mapStateToProps = state => ({ cart: state.cart, stock: state.stock, products: state.products })
export default connect(mapStateToProps)(Cart)
