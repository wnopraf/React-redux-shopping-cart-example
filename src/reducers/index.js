import stock from './stock'
import cart from './cart'
import { combineReducers } from 'redux'

export default combineReducers({ cart, stock })
