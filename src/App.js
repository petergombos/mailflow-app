import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header'
import Form from './Form'
import Result from './Result'

const API_URL = 'https://api.mailflow.io'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (payload) {
    return axios.post(`${API_URL}/search`, payload)
    .then(({ data }) =>
      this.waitForSearchResults(data._id)
    )
    .then(data => {
      this.setState(data)
    })
  }

  waitForSearchResults (_id) {
    return new Promise((resolve, reject) => {
      this.checkSearchResult(_id, resolve, reject)
    })
  }

  checkSearchResult (_id, resolve, reject) {
    axios.get(`${API_URL}/search/${_id}`)
    .then(({ data }) => {
      if (data.status === 'finished') {
        return resolve(data)
      } else {
        return setTimeout(() => this.checkSearchResult(_id, resolve), 800)
      }
    })
    .catch(reject)
  }

  render () {
    return (
      <div>
        <Header />
        <Form onSubmit={this.handleSearch} />
        {this.state._id &&
          <Result data={this.state} />
        }
      </div>
    )
  }
}

export default App
