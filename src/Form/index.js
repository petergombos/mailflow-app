import React, { Component } from 'react'
import PropTypes from 'prop-types'
import parseDomain from 'parse-domain'
import './style.css'

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = this.defaultState

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  defaultState = {
    name: '',
    domain: '',
    valid: false,
    submitting: false
  }

  handleInputChange (e) {
    const key = e.target.id
    let value = e.target.value

    if (key === 'domain') {
      const parsed = parseDomain(value)
      if (parsed) {
        value = `${parsed.domain}.${parsed.tld}`
      } else {
        value = ''
      }
    } else {
      value = value.split(' ').splice(0, 3).join(' ')
    }

    this.setState({
      [key]: value
    }, () => {
      if (this.state.domain && this.state.name) {
        this.setState({
          valid: true
        })
      } else {
        this.setState({
          valid: false
        })
      }
    })
  }

  handleFormSubmit (e) {
    e.preventDefault()
    this.setState({
      submitting: true
    })
    this.props.onSubmit(this.state)
      .then(() => {
        this.setState(this.defaultState)
        this.refs.form.reset()
      })
  }

  render () {
    return (
      <form ref='form' className='Form' onSubmit={this.handleFormSubmit}>
        <span className='label'>Name</span>
        <input id='name' type='text' placeholder='Elon Musk' onChange={this.handleInputChange} />
        <p className='hint'>First and last name of the person.</p>
        <span className='label'>Company Domain</span>
        <input id='domain' type='text' placeholder='spacex.com' onChange={this.handleInputChange} />
        <p className='hint'>The primary domain of the company.</p>
        <div className='footer'>
          <button type='submit' disabled={!this.state.valid || this.state.submitting}>
            {this.state.submitting
              ? ('Searching...')
              : ('Find Email')
            }
          </button>
        </div>
      </form>
    )
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Form
