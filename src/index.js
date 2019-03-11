import React from 'react'
import store from './store'
import { render } from 'react-dom'
import Main from './components'
import { Provider } from 'react-redux'

const App = () => <div className='app'>
  <Main />
  <style jsx global>{`
  *, *:before, *:after {
    box-sizing: border-box;
  }
  :root {
    font-size: 10px;
    --primary-color: #BACBFC;
    --secondary-color: #36487B;
    --grey-color: #DEE5F7;
    --terciary-color: #6E92FB;
    --fourth-color: #5875C8;
  }

`}</style>
</div>
render(<Provider store={store}>
  <App />

</Provider>, document.getElementById('app'))
