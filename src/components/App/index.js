import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'
import Form from '../Form'
import Result from '../Result'
import './index.css'

class App extends Component {
  render () {
    const { searches, isSubmitting, searchSubmit } = this.props
    return (
      <div>
        <Header />
        {searches.map(searchResult =>
          <Result key={searchResult._id} data={searchResult} />
        )}
        <Form onSubmit={searchSubmit} submitting={isSubmitting} />
      </div>
    )
  }
}

App.propTypes = {
  searches: PropTypes.array,
  isSubmitting: PropTypes.bool,
  searchSubmit: PropTypes.func.isRequired
}

export default App
