import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import data from '../data/products'
import cartReducer from '../reducers'

const { products, stock } = data

const store = createStore(cartReducer, { products, stock }, applyMiddleware(thunk))

export default store
