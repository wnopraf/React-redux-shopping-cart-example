import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { stock, products } from '../data/products'
import cartReducer from '../reducers'

createStore(cartReducer, { products, stock }, applyMiddleware(thunk))
