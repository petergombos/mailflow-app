import React from 'react'
import PropTypes from 'prop-types'

const Result = ({ data }) => {
  return (
    <div>
      Result
      {data.error &&
        <div className='error'>{data.error}</div>
      }
      {!data.error && !data.emails.length &&
        <div className='error'>Could not find email address for this person.</div>
      }
      {!!data.emails.length && data.emails.map((email, index) =>
        <span key={index} className='email'>
          {email}
        </span>
      )}
    </div>
  )
}

Result.propTypes = {
  data: PropTypes.object.isRequied
}

export default Result
