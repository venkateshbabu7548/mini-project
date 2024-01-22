import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-large-bg-container">
          <div className="left-container">
            <div className="login-responsive">
              <img
                src="https://res.cloudinary.com/dqeh6jl97/image/upload/v1702367546/Frame_274_lhty1f.png"
                className="website-logo"
                alt="website logo"
              />
              <p className="website-heading">Tasty Kitchens</p>
              <h1>Login</h1>
              <form
                className="login-form-container"
                onSubmit={this.onSubmitForm}
              >
                <div className="login-input-field">
                  <label htmlFor="username">USERNAME</label>
                  <input
                    type="text"
                    className="login-input"
                    id="username"
                    onChange={this.onChangeUsername}
                    value={username}
                  />
                </div>
                <div className="login-input-field">
                  <label htmlFor="password">PASSWORD</label>
                  <input
                    type="password"
                    className="login-input"
                    id="password"
                    onChange={this.onChangePassword}
                    value={password}
                  />
                </div>
                {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
                <button type="submit" className="login-btn">
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="right-container">
            <img
              src="https://res.cloudinary.com/dqeh6jl97/image/upload/v1702365235/Rectangle_1456_mp6uhs.png"
              className="website-login"
              alt="website login"
            />
          </div>
        </div>

        <div className="login-small-bg-container">
          <div className="login-top-container">
            <img
              src="https://res.cloudinary.com/dqeh6jl97/image/upload/v1702372669/Rectangle_1457_kkeemz.png"
              alt="website-login"
              className="small-website-login"
            />
          </div>
          <div className="login-bottom-container">
            <h1>Login</h1>
            <form
              className="login-form-small-container"
              onSubmit={this.onSubmitForm}
            >
              <div className="login-input-field">
                <label htmlFor="username1">USERNAME</label>
                <input
                  type="text"
                  className="login-input"
                  id="username1"
                  onChange={this.onChangeUsername}
                  value={username}
                />
              </div>
              <div className="login-input-field">
                <label htmlFor="password1">PASSWORD</label>
                <input
                  type="password"
                  className="login-input"
                  id="password1"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Login
