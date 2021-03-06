export const selectIdItem = (stateSlice, id) => stateSlice.find(e => e.productId === id)
export const selectProductItem = (products, id) => products.find(e => e.id === id)
export function pageButtons (data, itemsPerPage = 6) {
  const totalProducts = data.length
  const totalPages = totalProducts % itemsPerPage === 0 ? totalProducts / itemsPerPage : Math.floor(totalProducts / itemsPerPage + 1)
  return totalPages
}

export function paginate (data, page, itemsPerPage = 6) {
  const sliceEnd = itemsPerPage * page
  const sliceStart = sliceEnd - itemsPerPage
  const products = data.slice(sliceStart, sliceEnd)
  return products
}

export function padDigits (pattern, number) {
  const totalDigits = pattern.length
  const digitsDiff = totalDigits - number.length
  if (digitsDiff >= 0) return number
  const nbs = '&nbs'
  return nbs.repeat(2) + number
}
