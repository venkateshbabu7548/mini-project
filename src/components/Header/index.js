import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'

import {IoMenuSharp} from 'react-icons/io5'
import {IoMdCloseCircle} from 'react-icons/io'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const [isIconClicked, changeState] = useState(false)
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const onClickMenu = () => {
    changeState(true)
  }

  const onClickClose = () => {
    changeState(false)
  }

  return (
    <>
      <div className="header-container">
        <div className="header-responsive">
          <div className="header-left-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dqeh6jl97/image/upload/v1702367546/Frame_274_lhty1f.png"
                className="website-logo"
                alt="website logo"
              />
            </Link>
            <h1 className="header-heading">Tasty Kitchens</h1>
          </div>
          <div className="header-right-container">
            <ul className="header-menu">
              <li>
                <Link to="/" className="each-menu">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/cart" className="each-menu">
                  Cart
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
          <div className="header-menu-icon-con">
            <button type="button" className="button-icon" onClick={onClickMenu}>
              <IoMenuSharp className="hamberger-icon" aria-label="close" />
            </button>
          </div>
        </div>
      </div>
      {isIconClicked && (
        <div className="extra-icon-con">
          <ul className="extra-content">
            <li>
              <Link to="/" className="each-menu">
                Home
              </Link>
            </li>

            <li>
              <Link to="/cart" className="each-menu">
                Cart
              </Link>
            </li>
          </ul>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
          <button type="button" className="close-btn" onClick={onClickClose}>
            <IoMdCloseCircle className="close-icon" aria-label="close" />
          </button>
        </div>
      )}
    </>
  )
}

export default withRouter(Header)
