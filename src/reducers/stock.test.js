import stockReducer from './stock'
import { stock } from '../data/products'
import { INCREMENT_STOCK, DECREMENT_SOTCK } from '../constants'

describe('stock reducer', () => {
  const incAction = {
    type: INCREMENT_STOCK,
    id: 3
  }
  const decAction = {
    type: DECREMENT_SOTCK,
    id: 6
  }
  test('return array', () => {
    expect(stockReducer(stock, incAction)).toBeInstanceOf(Array)
  })
  test('return an array of objects with the right props', () => {
    stockReducer(stock, incAction).forEach(e => {
      expect(e).toHaveProperty('productId', expect.any(Number))
      expect(e).toHaveProperty('stock', expect.any(Number))
    })
  })
  test('Mutability check. return a new array with new objects', () => {
    expect(stockReducer(stock, incAction) === stock).toBe(false)
    stockReducer(stock, incAction).forEach((e, i) => expect(e === stock[i]).toBe(false))
  })
  test('increment action', () => {
    const beforeAction = stock.find(e => e.productId === incAction.id)
    const afterAction = stockReducer(stock, incAction).find(e => e.productId === incAction.id)
    expect(afterAction.stock).toBe(beforeAction.stock + 1)
  })
  test('decrement action', () => {
    const beforeAction = stock.find(e => e.productId === decAction.id)
    const afterAction = stockReducer(stock, decAction).find(e => e.productId === decAction.id)
    expect(afterAction.stock).toBe(beforeAction.stock - 1)
  })
  test('decrement action with stock 0', () => {
    expect.assertions(2)
    const fakeStock = [{ id: 4, stock: 0 }]
    const decAction = { type: DECREMENT_SOTCK, id: 4 }
    let afterAction = stockReducer(fakeStock, decAction)[0]
    expect(afterAction.stock).toBe(0)
    fakeStock.stock += 1
    afterAction = stockReducer(fakeStock, decAction)[0]
    expect(afterAction.stock).toBe(0)
  })
})
