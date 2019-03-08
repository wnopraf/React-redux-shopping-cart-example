import React from 'react'
import { Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Menu from './Menu'
import MainView from './MainView'
import CheckOutView from './CheckOut'

export const history = createBrowserHistory()
export default () => <Router history={history}>
  <div className='wrapper'>
    <header>
      <div className='container'>
        <h1>React shopping cart App</h1>
      </div>

    </header>
    <div className='nav'>
      <div className='container'>
        <Menu />
      </div>

    </div>

    <div className='container'>
      <Route exact path='/' component={MainView} />
      <Route path='/checkout' component={CheckOutView} />
    </div>
    <footer>
      <div className='container'>
        <h3>All rights reserved to react cart shopping sample. ©</h3>
      </div>

    </footer>
    <style jsx global>{`
    *, *:before, *:after {
      box-sizing: border-box;
    }
    .wrapper {
     font-size: 1.6rem;
     font-family: 'Lato', sans-serif;

    }
    :root {
      font-size: 10px;
      --primary-color: #BACBFC;
      --secondary-color: #36487B;
      --grey-color: #DEE5F7;
      --terciary-color: #6E92FB;
      --fourth-color: #5875C8;
    }
    .container {
      padding: 0 1.4rem;
      margin: 0 auto;
    }
    @media (min-width: 992px) {
      .container {
        max-width: 100%;
      }
    }
    @media (min-width: 1200px) {
      .container {
        max-width: 1200px;
      }
      
    }
    h1 {
      font-size: 2.5rem;
    }
    h3 {
      font-size: 2rem;
    }
    
    h1, h2 {
      line-height: 2;
    }
    header {
      font-family: 'ZCOOL QingKe HuangYou', cursive;
      text-align:center;
      padding: 2rem 0;
      background: var(--primary-color);

    }
    .nav {
      background: var(--terciary-color);
    }
    footer {
      text-align: center;
      padding: 2em 0;
      background: var(--secondary-color);
    }
    footer h3 {
      font-size: .9rem;
      color: var(--grey-color);
    }
    
  `}</style>
  </div>

</Router>
