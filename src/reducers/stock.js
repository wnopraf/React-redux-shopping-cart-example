import { INCREMENT_STOCK, DECREMENT_SOTCK } from '../constants'

export default (stockState = [], action) => {
  const { type, id } = action
  switch (type) {
    case INCREMENT_STOCK:
      return stockState.map(e => {
        if (e.id === id) {
          e.stock += 1
        }
        return e
      })
    case DECREMENT_SOTCK:
      return stockState.map(e => {
        if (e.id === id && e.stock > 0) {
          e.stock -= 1
        }
        return e
      })
  }
}
