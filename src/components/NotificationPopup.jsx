import { useEffect } from 'react'
import '../NotificationPopup.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const NotificationPopup = ({ message, type, title, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose()
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [message, onClose])

  if (!message) return null

  return (
    <div className={`notification-popup ${type}`}>
      <p
        style={{ display: 'flex', justifyContent: 'center', fontSize: '36px' }}
      >
        New Recipe Created
      </p>
      <p style={{ fontSize: '22px' }}>Title: {`${title}`}</p>
      <Link to={`/recipes/${message}/`}>
        <h2 style={{ color: 'white' }}>Click Here To Go To The New Recipe</h2>
      </Link>
      <br />
      <button onClick={onClose}>&times;</button>
    </div>
  )
}

NotificationPopup.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  link: PropTypes.string,
  onClose: PropTypes.func,
}
