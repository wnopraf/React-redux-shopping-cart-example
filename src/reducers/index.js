import stock from './stock'
import amount from './amount'
import products from './products'

import { combineReducers } from 'redux'

export default combineReducers({ amount, stock, products })
