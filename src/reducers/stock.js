import { INCREMENT_STOCK, DECREMENT_SOTCK } from '../constants'

export default (stockState = [], action) => {
  const { type, id } = action
  switch (type) {
    case INCREMENT_STOCK:
      return stockState.map(e => {
        const newStock = { ...e }
        if (e.productId === id) {
          newStock.stock += 1
        }
        return newStock
      })
    case DECREMENT_SOTCK:
      return stockState.map(e => {
        const newStock = { ...e }

        if (e.productId === id && e.stock > 0) {
          newStock.stock -= 1
        }
        return newStock
      })
    default:
      return stockState
  }
}
