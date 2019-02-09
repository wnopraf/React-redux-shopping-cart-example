import { INCREMENT_AMOUNT, DECREMENT_AMOUNT } from '../constants'
import { selectIdItem } from '../util'
export default (cart = [], action) => {
  const { type, id } = action
  switch (type) {
    case INCREMENT_AMOUNT:
      if (!selectIdItem(cart, id)) {
        return [...cart, { productId: id, amount: 1 }]
      } else {
        return cart.map(e => {
          const newAmount = { ...e }
          if (e.productId === id) {
            newAmount.amount += 1
          }
          return newAmount
        })
      }

    case DECREMENT_AMOUNT:
      const cartItem = selectIdItem(cart, id)
      if (cartItem.amount === 1) {
        return cart.filter(e => e.productId !== id)
      } else {
        return cart.map(e => {
          const newAmount = { ...e }
          if (e.productId === id) {
            newAmount.amount -= 1
          }
          return newAmount
        })
      }

    default:
      return cart
  }
}
