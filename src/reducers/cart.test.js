import { INCREMENT_AMOUNT, DECREMENT_AMOUNT } from '../constants'
import { selectIdItem } from '../util'
import amountReducer from './cart'
import data from '../data/products'
const { products } = data

const mockCart = products.slice(2, 9).map(({ id }) => ({ productId: id, amount: Math.floor(Math.random() * 6 + 1) }))
describe('amount reducer', () => {
  const incAction = {
    type: INCREMENT_AMOUNT,
    id: 7
  }
  const decAction = {
    type: DECREMENT_AMOUNT,
    id: 7
  }
  describe('Empty cart', () => {
    test('Initial cart item', () => {
      const initAmount = amountReducer(undefined, incAction)[0]
      expect(initAmount).toEqual({ productId: 7, amount: 1 })
    })
    test('Increment action', () => {
      const amountState = [{ productId: 7, amount: 4 }]
      const inAmount = amountReducer(amountState, incAction)
      expect(inAmount).toEqual([{ productId: 7, amount: 5 }])
    })
    test('Increment twice', () => {
      const amountState = [{ productId: 7, amount: 4 }]
      const inAmount = amountReducer(amountState, incAction)
      expect(inAmount).not.toEqual([{ productId: 7, amount: 6 }])
    })
    test('Decrement Action', () => {
      const amountState = [{ productId: 7, amount: 8 }]
      const decAmount = amountReducer(amountState, decAction)
      expect(decAmount).toEqual([{ productId: 7, amount: 7 }])
    })
  })
  describe('Mock cart with data', () => {
    test('Mock cart length', () => {
      expect(mockCart).toHaveLength(7)
    })
    describe('Incrementing item amount', () => {
      const incAction = {
        type: INCREMENT_AMOUNT,
        id: 3
      }
      it.skip('Cart state', () => {
        expect(mockCart).toMatchSnapshot()
      })
      const itemBeforeAction = selectIdItem(mockCart, 3)
      const cartAfterAction = amountReducer(mockCart, incAction)
      const itemAfterAction = selectIdItem(cartAfterAction, 3)
      it('Has the right length after increment', () => {
        expect(cartAfterAction).toHaveLength(7)
      })
      it('Has the right amount after incrment', () => {
        expect(itemAfterAction.amount).toBe(itemBeforeAction.amount + 1)
      })
    })
    describe('adding new item to cart', () => {
      const incAction = {
        type: INCREMENT_AMOUNT,
        id: 12
      }
      const reducerState = amountReducer(mockCart, incAction)
      it('Cart has has the right length', () => {
        expect(reducerState).toHaveLength(8)
      })
      it('New Cart item has the rigth amount', () => {
        const newItem = selectIdItem(reducerState, incAction.id)
        expect(newItem.amount).toBe(1)
      })
    })
    describe('Deleting item from cart', () => {
      const delAction = {
        type: DECREMENT_AMOUNT,
        id: 12
      }
      const inAction = {
        type: INCREMENT_AMOUNT,
        id: 12
      }
      let cart = amountReducer(mockCart, inAction)
      it('Cart has 8 items before deleting', () => {
        expect(cart).toHaveLength(8)
      })
      it('Item has amount 1 before deleting', () => {
        const { amount } = selectIdItem(cart, 12)
        expect(amount).toBe(1)
      })
      it('Cart has 7 items after deleting', () => {
        cart = amountReducer(cart, delAction)
        expect(cart).toHaveLength(7)
      })
    })
  })
})
