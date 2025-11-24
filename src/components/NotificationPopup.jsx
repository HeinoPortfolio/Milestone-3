import { useEffect } from 'react'
import '../NotificationPopup.css'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

export const NotificationPopup = ({ message, type, /* link,*/ onClose }) => {
  const some_other_message = 'There is a another '

  const _id = '692372c9c71a162cc4bdcf1c'
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose()
      }, 30000) // Auto-hide after 5 seconds 5000
      return () => clearTimeout(timer)
    }
  }, [message, onClose])

  if (!message) return null

  return (
    <div className={`notification-popup ${type}`}>
      <p>{message}</p>
      <Link to={`/recipes/${_id}/`}>
        <h2 style={{ color: 'white' }}>Click Here To Go To The New Recipe</h2>
      </Link>
      <p>This Message: {some_other_message}</p>
      <br />

      <button onClick={onClose}>&times;</button>
    </div>
  )
}

NotificationPopup.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  link: PropTypes.string,
  onClose: PropTypes.func,
}
