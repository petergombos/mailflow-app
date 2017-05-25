import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header'
import Form from './Form'
import Result from './Result'

const API_URL = 'https://api.mailflow.io'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = this.defaultState
    this.handleSearch = this.handleSearch.bind(this)
  }

  defaultState = {
    result: {}
  }

  handleSearch (payload) {
    this.setState(this.defaultState)
    return axios.post(`${API_URL}/search`, payload)
    .then(({ data }) =>
      this.waitForSearchResults(data._id)
    )
    .then(data => {
      this.setState({
        result: data
      })
    })
  }

  waitForSearchResults (_id) {
    return new Promise((resolve, reject) => {
      this.checkSearchProgress(_id, resolve, reject)
    })
  }

  checkSearchProgress (_id, resolve, reject) {
    axios.get(`${API_URL}/search/${_id}`)
    .then(({ data }) => {
      if (data.status === 'finished') {
        return resolve(data)
      } else {
        return setTimeout(() => this.checkSearchProgress(_id, resolve), 800)
      }
    })
    .catch(reject)
  }

  render () {
    return (
      <div>
        <Header />
        {this.state.result._id &&
          <Result data={this.state.result} />
        }
        <Form onSubmit={this.handleSearch} />
      </div>
    )
  }
}

export default App
