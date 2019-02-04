import stock from './stock'
import cart from './cart'
import productList from '../data/products'
import { combineReducers } from 'redux'

export default combineReducers({ cart, stock })
