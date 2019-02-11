import store from '.'
import { decrementAction, incrementAction } from '../actions'
import { selectIdItem } from '../util'

describe('How store behaves on actions', () => {
  test.skip('First store snap', () => {
    expect(store.getState()).toMatchSnapshot()
  })
  const { cart, stock: initialStock } = store.getState()
  describe('Adding product to cart', () => {
    it('Cart is an Array', () => {
      store.dispatch(incrementAction(7))
      expect(cart).toBeInstanceOf(Array)
    })
    it('Cart has one item', () => {
      expect(store.getState().cart).toHaveLength(1)
    })
    it('Stock has one less unit', () => {
      const afterStockItem = selectIdItem(store.getState().stock, 7)
      const beforeStockItem = selectIdItem(initialStock, 7)
      expect(beforeStockItem.stock).toBe(afterStockItem.stock + 1)
    })
    it('First item check', () => {
      expect(store.getState().cart[0]).toEqual({ productId: 7, amount: 1 })
    })

    it('Cart has two item', () => {
      store.dispatch(incrementAction(2))
      expect(store.getState().cart).toHaveLength(2)
    })
    it('Second item check', () => {
      expect(store.getState().cart[1]).toEqual({ productId: 2, amount: 1 })
    })
    it('Second item stock has one less unit', () => {
      const afterStockItem = selectIdItem(store.getState().stock, 2)
      const beforeStockItem = selectIdItem(initialStock, 2)
      expect(beforeStockItem.stock).toBe(afterStockItem.stock + 1)
    })
    it('Adding three more items to cart', () => {
      for (let index = 5; index < 8; index++) {
        store.dispatch(incrementAction(index))
      }
      expect(store.getState().cart).toHaveLength(4)
    })
    it('Item 7 has amount 2', () => {
      const item = selectIdItem(store.getState().cart, 7)
      expect(item.amount).toBe(2)
    })
  })
  describe('Deleting product of cart', () => {
    it('Cart has 3 items', () => {
      store.dispatch(decrementAction(2))
      expect(store.getState().cart).toHaveLength(3)
    })
    it('Item 2 stock has been upgraded correctly', () => {
      const LastState = selectIdItem(store.getState().stock, 2)
      const defaultSate = selectIdItem(initialStock, 2)
      expect(LastState).toEqual(defaultSate)
    })
    it('Checking amount 0 validation', () => {
      store.dispatch(decrementAction(2))
      const { cart: nowCart, stock } = store.getState()
      const cartItem = selectIdItem(nowCart, 2)
      const stockItem = selectIdItem(stock, 2)
      const defaultStockItem = selectIdItem(initialStock, 2)
      expect.assertions(2)
      expect(cartItem).toBe(undefined)
      expect(stockItem).toEqual(defaultStockItem)
    })
  })
})
