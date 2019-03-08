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
    return <div className='loading-animation'>

      <h1>Loading</h1>

    </div>
  }
}
