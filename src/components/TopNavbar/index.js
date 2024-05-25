import React from 'react'
import {withRouter} from 'react-router-dom'
import {FaUserCircle} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {IoIosSearch} from 'react-icons/io'
import Popup from 'reactjs-popup'

import './TopNavbar.css'

const TopNavbar = ({history, onChangeSearch, searchQuery}) => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickLog = () => {
    history.replace('/')
  }

  return (
    <nav className="nav1">
      <ul className="nav-list">
        <li className="hedaing-logo">
          <h1 className="first-heading">MOVIE</h1>
          <h1 className="sec-heading">MINGLE</h1>
        </li>
        <li className="search-container">
          <IoIosSearch className="search-icon" />
          <input
            type="search"
            className="serachBar"
            value={searchQuery}
            onChange={onChangeSearch}
            placeholder="Search ..."
          />
        </li>
        <li className="user-btn">
          <FaUserCircle className="user-prf" />
          <Popup
            trigger={
              <button className="logoutBtn" type="button">
                Logout
              </button>
            }
            position="bottom center"
          >
            <div className="popup-content">
              <p>Are you sure you want to logout?</p>
              <button className="confirm-btn" onClick={onClickLogout}>
                Yes
              </button>
              <button className="cancel-btn" onClick={onClickLog}>
                No
              </button>
            </div>
          </Popup>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(TopNavbar)
