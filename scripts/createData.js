const fs = require('fs')

let idTracker = 1

const fakeId = () => idTracker++
const randomInterval = (min, max) => min + Math.random() * (max - min)
const randomPrize = (min, max) => {
  const prize = randomInterval(min, max)
  return prize.toFixed(2)
}
const randomStock = (min, max) => {
  const stock = randomInterval(min, max)
  return Math.round(stock)
}
const abc = 'abcdefghijkelmnñopqrstuvwyz'

const makeProducts = (str) => {
  const products = []
  for (let name of abc) {
    const product = {
      id: fakeId(),
      name: `product-${name.toUpperCase()}`,
      prize: randomPrize(60, 150)
    }
    products.push(product)
  }
  return products
}
const products = makeProducts(abc)

const stock = products.map(e => ({ productId: e.id, stock: randomStock(8, 15) }))

fs.writeFileSync('src/data/products.js', `export default ${JSON.stringify({ products, stock }, null, 3)}`)
