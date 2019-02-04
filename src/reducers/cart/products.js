
import { ADD_PRODUCT, DELETE_PRODUCT } from '..constants/'

export default (products = [], action) => {
  const { type, id } = action
  switch (type) {
    case ADD_PRODUCT:
      const newProduct = products.find(e => e.id === id)
      return [...products, newProduct]
    case DELETE_PRODUCT:
      return products.filter(e => e.id !== id)
    default:
      return products
  }
}
