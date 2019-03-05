import React, { Component } from 'react'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: true }
    this.onResize = this.onResize.bind(this)
  }
  Menu () {
    return <div className='menu'>
      <a href='' className='menu__item'>Home</a>
      <a href='' className='menu__item'>About</a>
      <a href='' className='menu__item'>Pricing</a>
      <a href='' className='menu__item'>Blog</a>
      <style jsx>{`
        .menu {
            display: flex;
            flex-direction: column;
            text-align: center;
            padding: 1rem 0;
        }
        @media (min-width: 480px) {
          .menu {
            flex-direction: row;
          }  
        }
        .menu__item {
            font-size: 1.6rem;
            padding: 1.6rem 0;
            text-decoration: none;
            color: black;
            background: var(--treciary-color);
            border: 1px solid var(--grey-color);
            margin-bottom: 1rem;
        }
        @media (min-width: 480px) {
            .menu__item {
                padding: .6rem 2rem;
                border: none;
                margin-bottom: 0;
            }          
            .menu__item + .menu__item {
              border-left: 1px solid var(--grey-color);
            }
            .menu__item:first-child {
              border-left: 1px solid var(--grey-color);
            }
            .menu__item:last-child {
              border-right: 1px solid var(--grey-color);
            }
        }
       

        
        
      
      `}</style>

    </div>
  }
  HamMenu () {
    return <div>
      <span onClick={e => this.setState({ isOpen: !this.state.isOpen })} className='ham-button'>&#9776;</span>
      {this.state.isOpen && this.Menu()}
      <style jsx>{`
        .ham-button {
            cursor: pointer;
         }
         @media (min-width: 480px) {
            .ham-button { 
                display: none;
            }
        }
      `}</style>
    </div>
  }
  render () {
    return this.HamMenu()
  }
  onResize () {
    console.log('inner-width', window.innerWidth)
    if (window.innerWidth >= 478) {
      this.setState({ isOpen: true })
    } else if (this.state.isOpen) {
      this.setState({ isOpen: false })
    }
  }

  componentDidMount () {
    console.log('didMount')
    window.addEventListener('resize', this.onResize)
    this.onResize()
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }
}
