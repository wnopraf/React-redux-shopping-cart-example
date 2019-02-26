import React from 'react'
import store from './store'
import { render } from 'react-dom'
import Main from './components'
import { Provider } from 'react-redux'
import Cart from './components/Cart'

render(<Provider store={store}>
  <Cart />

</Provider>, document.getElementById('app'))
