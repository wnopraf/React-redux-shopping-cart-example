import { createStore } from 'redux'
import { stock, products } from '../data/products'
import cartReducer from '../reducers'

createStore(cartReducer, { products, stock })
