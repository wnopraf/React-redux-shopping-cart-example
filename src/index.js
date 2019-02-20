import React from 'react'
import store from './store'
import { render } from 'react-dom'
import Main from './components'
import { Provider } from 'react-redux'

render(<Provider store={store}>
  <Main />

</Provider>, document.getElementById('app'))
