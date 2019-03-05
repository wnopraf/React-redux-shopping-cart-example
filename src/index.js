import React from 'react'
import store from './store'
import { render } from 'react-dom'
import Main from './components'
import { Provider } from 'react-redux'
import Cart from './components/Cart'
import { incrementAction, decrementAction } from './actions'

render(<Provider store={store}>
  <Main />

</Provider>, document.getElementById('app'))

function FakeDispatch () {
  return <div className='fake-dispatch'>
    <Cart />
    <button onClick={() => store.dispatch(incrementAction(7))}>inAction</button>
    <button onClick={() => store.dispatch(decrementAction(7))}>decAction</button>
    <button onClick={() => store.dispatch(incrementAction(Math.floor(Math.random() * 20)))}>inAction-- another product</button>
    <style jsx global>{`
    :root {
      font-size: 10px;
    }
    
    `}</style>
  </div>
}
