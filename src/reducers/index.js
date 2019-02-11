import stock from './stock'
import cart from './cart'
import products from './products'

import { combineReducers } from 'redux'

export default combineReducers({ cart, stock, products })
