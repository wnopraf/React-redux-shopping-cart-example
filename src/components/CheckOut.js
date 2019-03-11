import React, { Component } from 'react'
import { history } from './index'

export default class extends Component {
  componentDidMount () {
    this.timeOut = setTimeout(() => {
      history.push('/')
    }, 1000)
  }
  componentWillUnmount () {
    clearTimeout(this.timeOut)
  }
  render () {
    return <Loader displayText='Transfering pay' />
  }
}

const Loader = ({ displayText }) => <div className='loader-wrapper'>
  <div className='loader-container'>
    <h1>{displayText}</h1>
    <div className=' circle out-circle' />
  </div>

  <style jsx>
    {`{
      .loader-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 75vh;
      }
      .loader-container {
        text-align: center;
      }
      .circle {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        display: inline-block;
      }
      .out-circle {
        border: 6px solid orange;
        border-top: none;
        border-left: none;
        animation-name: rotate;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

    }`}

  </style>
</div>
