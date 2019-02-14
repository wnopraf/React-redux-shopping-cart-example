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
            font-size: 10px;
            display: flex;
            flex-direction: column;
            text-align: center;
            @media (min-width: 480px) {
                flex-direction: row;
            }
        }
        
        .menu__item {
            font-size: 1.6em;
            padding: 1.6em 0;
            text-decoration: none;
            color: black;
            background: orange;
            border: 1px solid darken(orange, 10%);
            @media (min-width: 480px) {
                padding: .6em 2em;
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
            @media (min-width: 480px) {
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
    if (window.innerWidth > 480) { this.setState({ isOpen: true }) }
  }

  componentDidMount () {
    console.log('didMount')
    window.addEventListener('resize', this.onResize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }
}
