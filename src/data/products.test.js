import data from './products'
const { products, stock } = data

describe('products', () => {
  test('products length', () => {
    expect(products).toHaveLength(27)
  })
  test('product has the right props', () => {
    products.forEach(e => expect(e).toMatchObject({ id: expect.any(Number), name: expect.any(String), prize: expect.any(String) }))
  })

  test('product id is in range of 27', () => {
    products.forEach(e => {
      expect(e.id).toBeGreaterThanOrEqual(1)
      expect(e.id).toBeLessThanOrEqual(27)
    })
  })

  test('product prize have two decimals', () => {
    products.forEach(e => {
      expect(e.prize).toMatch(/[0-9]{2,3}\.[0-9]{2}/)
    })
  })
})

describe('stock', () => {
  test('stock length', () => {
    expect(stock).toHaveLength(27)
  })

  test('stock has the right props', () => {
    stock.forEach(e => expect(e).toMatchObject({ productId: expect.any(Number), stock: expect.any(Number) }))
  })

  test('stock prop is not a real number', () => {
    stock.forEach(e => expect(Number.isInteger(e.stock)).toBe(true))
  })
})
