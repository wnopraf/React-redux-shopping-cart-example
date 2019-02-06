import { INCREMENT_AMOUNT, DECREMENT_AMOUNT } from '../../constants'

export default (quantity = [], action) => {
  const { type, id } = action
  switch (type) {
    case INCREMENT_AMOUNT:
      if (!quantity.length) {
        return [{ productId: id, amount: 1 }]
      }
      return quantity.map(e => {
        const newAmount = { ...e }
        if (e.productId === id) {
          newAmount.amount += 1
        }
        return newAmount
      })
    case DECREMENT_AMOUNT:
      return quantity.map(e => {
        const newAmount = { ...e }
        if (e.productId === id) {
          newAmount.amount -= 1
        }
        return newAmount
      })
    default:
      return quantity
  }
}
