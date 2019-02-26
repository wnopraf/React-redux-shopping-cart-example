import React from 'react'
import Cart from './Cart'
import store from '../store'
import { incrementAction, decrementAction } from '../actions'
import { Provider } from 'react-redux'
import createComponent from 'react-unit'
import renderer from 'react-test-renderer'
import { selectIdItem } from '../util'

describe('Cart component elements', () => {
  let cart
  let cartDom
  beforeAll(() => {
    cart = renderer.create(<Provider store={store}><Cart /></Provider>)
    cartDom = cart.root
  })

  test('Cart has 0 item', () => {
    expect.assertions(2)
    expect(cart.toJSON()).toMatchSnapshot()
    expect(cartDom.findAllByProps({ className: 'cart-item' }).length).toBe(0)
  })
  test('Cart has 1 item', () => {
    store.dispatch(incrementAction(4))
    expect.assertions(2)

    expect(cart.toJSON()).toMatchSnapshot()
    expect(cartDom.findAllByProps({ className: 'cart-item' }).length).toBe(1)
  })
  test('Cart has 2 item', () => {
    expect.assertions(2)
    store.dispatch(incrementAction(7))
    expect(cart.toJSON()).toMatchSnapshot()
    expect(cartDom.findAllByProps({ className: 'cart-item' }).length).toBe(2)
  })
  test('Cart lost 1 item', () => {
    expect.assertions(3)
    store.dispatch(decrementAction(4))
    expect(cart.toJSON()).toMatchSnapshot()
    expect(cartDom.findAllByProps({ className: 'cart-item' }).length).toBe(1)
    expect(cartDom.findAll(e => e.props['data-productId'] === 4).length).toBe(0)
  })
  describe('Solo item test', () => {
    let item_5
    beforeAll(() => {
      store.dispatch(incrementAction(5))
      item_5 = cartDom.find(e => e.props['data-productId'] === 5)
    })
    test('CartItem 5 has amount 2', () => {
      expect.assertions(2)

      item_5.find(e => e.props['data-add']).props.onClick()
      expect(cart.toJSON()).toMatchSnapshot()
      expect(item_5.find(e => e.props.className === 'amount').children[0]).toBe('2')
    })
    test('CartItem 5 has amount 3', () => {
      expect.assertions(2)
      item_5.find(e => e.props['data-add']).props.onClick()
      expect(cart.toJSON()).toMatchSnapshot()
      expect(item_5.find(e => e.props.className === 'amount').children[0]).toBe('3')
    })
    test('CartItem 5 has amount 2', () => {
      expect.assertions(2)
      item_5.find(e => e.props.className === 'subtract').props.onClick()
      expect(cart.toJSON()).toMatchSnapshot()
      expect(item_5.find(e => e.props.className === 'amount').children[0]).toBe('2')
    })
    test('CartItem 5 has no stock', () => {
      let stockItem = selectIdItem(store.getState().stock, 5)
      while (stockItem.stock > 0) {
        store.dispatch(incrementAction(5))
        stockItem = selectIdItem(store.getState().stock, 5)
      }
      item_5.find(e => e.props['data-add']).props.onClick()
      expect(cart.toJSON()).toMatchSnapshot()
      expect(item_5.findAll(e => e.props.className === 'no-stock').length).toBe(1)
    })
  })
})
