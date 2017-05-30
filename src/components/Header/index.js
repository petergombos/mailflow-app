import React from 'react'
import logo from './logo.png'
import './style.css'

const Header = () => (
  <div className='Header'>
    <img src={logo} alt='logo' />
    <h1>Get in touch with anyone, we can help you to find email address for whoever you want!</h1>
    <p>
      All emails we return are server validated.{' '}
      Meaning that the server responds positively to our query, so it's very likely{' '}
      that the mailbox exists. These emails usually have a very low bounce rate, lower than 3%.
    </p>
  </div>
)

export default Header
