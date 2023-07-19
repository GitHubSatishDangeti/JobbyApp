import {withRouter, Link} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import {MdWork} from 'react-icons/md'
import {ImHome} from 'react-icons/im'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-bg">
      <ul className="header-list">
        <li className="logo-container">
          <Link to="/">
            <img
              className="logo-image"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </li>
        <li className="home-jobs-container">
          <Link className="link" to="/">
            <h1 className="nav-list-item">Home</h1>
          </Link>
          <Link className="link" to="/jobs">
            <h1 className="nav-list-item">Jobs</h1>
          </Link>
        </li>
        <li>
          <button className="logout-button" onClick={onLogout} type="button">
            Logout
          </button>
        </li>

        <li className="home-jobs-container-mobile">
          <Link className="link" to="/">
            <ImHome className="react-icon" />
          </Link>
          <Link className="link" to="/jobs">
            <MdWork className="react-icon" />
          </Link>

          <FiLogOut onClick={onLogout} className="react-icon" />
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
