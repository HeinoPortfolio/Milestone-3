import { useEffect } from 'react'
import '../NotificationPopup.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const NotificationPopup = ({ link, type, title, onClose }) => {
  useEffect(() => {
    if (link) {
      const timer = setTimeout(() => {
        onClose()
      }, 30000)
      return () => clearTimeout(timer)
    }
  }, [link, onClose])

  if (!link) return null

  return (
    <div className={`notification-popup ${type}`}>
      <p
        style={{ display: 'flex', justifyContent: 'center', fontSize: '28px' }}
      >
        New Recipe Created!!!
      </p>
      <span style={{ fontSize: '26px' }}>
        <b>Title: &nbsp; &nbsp; {`${title}`}</b>
      </span>
      <br />
      <br />
      <span style={{ fontSize: '26px' }}>
        To go to the new recipe post: &nbsp; &nbsp;
        <Link to={`/recipes/${link}/`}>
          <b style={{ color: 'blue' }}>Click Here </b>
        </Link>
      </span>
      <br />
      <br />
      <div className='popup-content'>
        <button
          style={{ fontSize: '24px', border: '2px solid white' }}
          onClick={onClose}
        >
          {' '}
          Click To Close{' '}
        </button>
      </div>
    </div>
  )
}

NotificationPopup.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  link: PropTypes.string,
  onClose: PropTypes.func,
}
