import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Result = ({ data }) => {
  return (
    <div className='Result'>
      {data.isFetching &&
        <h2>Searching email for:<br />
          <span>{data.name}</span> on <span>{data.domain}</span>
        </h2>
      }
      {data.error &&
        <div>
          <h2>Woopsy, sorry about that!</h2>
          <div className='error'>{data.error}</div>
        </div>
      }
      {!data.error && !data.emails.length && !data.isFetching &&
        <div>
          <h2>Woopsy, sorry about that!</h2>
          <div className='error'>Could not find email address for this person.</div>
        </div>
      }
      {!!data.emails.length &&
        <h2>Here is what we found for<br />
          <span>{data.name}</span> on <span>{data.domain}</span>
        </h2>
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
  data: PropTypes.object.isRequired
}

export default Result
