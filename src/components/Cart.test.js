import React from 'react'
import store from '../store'
import Main, { history } from './index'
import { Provider } from 'react-redux'
import { selectIdItem } from '../util'
import { fireEvent, render, getByText as globalByText } from 'react-testing-library'
import 'jest-dom/extend-expect'

const { getByText, container, getByTestId, queryByTestId } = render(<Provider store={store}><Main /></Provider>)

describe('Cart component elements', () => {
  test('Cart has 0 item', () => {
    expect.assertions(2)
    expect(container.querySelector('.cart-wrapper')).toMatchSnapshot()

    console.log(store.getState().cart)
    expect(queryByTestId('data-item-product-C')).not.toBeInTheDocument()
  })
  test('Cart has 1 item', () => {
    fireEvent.click(getByTestId('product-C'))
    expect.assertions(2)
    expect(container.querySelector('.cart-wrapper')).toMatchSnapshot()
    expect(queryByTestId('data-item-product-C')).toBeInTheDocument()
  })
  test('Cart has 2 item', () => {
    expect.assertions(2)
    fireEvent.click(getByTestId('product-F'))
    expect(container.querySelector('.cart-wrapper')).toMatchSnapshot()
    expect(queryByTestId('data-item-product-F')).toBeInTheDocument()
  })
  test('Cart lost 1 item', () => {
    expect.assertions(2)
    fireEvent.click(getByTestId('data-item-product-F').querySelector('[data-subtract]'))
    expect(container.querySelector('.cart-wrapper')).toMatchSnapshot()
    expect(queryByTestId('data-item-product-F')).not.toBeInTheDocument()
  })
  test('Cart is empty', (done) => {
    fireEvent.click(getByText('checkout'))
    expect(history.location.pathname).toBe('/checkout')
    expect(container.querySelector('.loading-animation')).toBeInTheDocument()

    setTimeout(() => {
      expect(history.location.pathname).toBe('/')
      expect(getByTestId('cart-total')).toHaveTextContent('0.00 $')
      done()
    }, 1002)
  })
})
describe('Solo item test', () => {
  let productD
  let cartItemD
  beforeAll(() => {
    productD = getByTestId('product-D')
    fireEvent.click(globalByText(productD, 'Add to cart'))
    cartItemD = getByTestId('data-item-product-D')
  })
  test('Product-D has amount 2', () => {
    expect.assertions(2)

    fireEvent.click(globalByText(cartItemD, '+'))
    expect(container).toMatchSnapshot()
    expect(globalByText(cartItemD, /^2$/)).toHaveTextContent('2')
  })
  test('Product-D has amount 3', () => {
    expect.assertions(2)
    fireEvent.click(globalByText(cartItemD, '+'))
    expect(container).toMatchSnapshot()
    expect(globalByText(cartItemD, /^3$/)).toHaveTextContent('3')
  })
  test('Product-D has amount 2', () => {
    expect.assertions(2)
    fireEvent.click(globalByText(cartItemD, '-'))
    expect(container).toMatchSnapshot()
    expect(globalByText(cartItemD, /^2$/)).toHaveTextContent('2')
  })
  test('Product-D has no stock', () => {
    expect.assertions(2)
    let stockItem = selectIdItem(store.getState().stock, 4)
    while (stockItem.stock > 0) {
      fireEvent.click(globalByText(cartItemD, '+'))
      stockItem = selectIdItem(store.getState().stock, 4)
    }
    fireEvent.click(globalByText(cartItemD, '+'))
    expect(globalByText(cartItemD, 'Out of existences')).toHaveTextContent('Out of existences')
    expect(container).toMatchSnapshot()
  })
})
