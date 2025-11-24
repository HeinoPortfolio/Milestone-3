import { useEffect } from 'react'
import '../NotificationPopup.css'
import PropTypes from 'prop-types'

export const NotificationPopup = ({ message, type, link, onClose }) => {
  const some_other_message = 'There is a another '
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
      <p>This Message: {some_other_message}</p>
      <br />
      <a href={link}>See new Recipe</a>
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
