import { INCREMENT_AMOUNT, DECREMENT_AMOUNT } from '../../constants'

export default (quantity = [], action) => {
  const { type, id } = action
  switch (type) {
    case INCREMENT_AMOUNT:
      return quantity.map(e => {
        if (e.id === id) {
          e.amount += 1
        }
        return e
      })
    case DECREMENT_AMOUNT:
      return quantity.map(e => {
        if (e.id === id) {
          e.amount -= 1
        }
        return e
      })
    default:
      return quantity
  }
}
