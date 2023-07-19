import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showError: true,
      errorMsg,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      // console.log(data.jwt_token)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="login-bg">
          <form className="form-bg" onSubmit={this.submitForm}>
            <div className="img-container">
              <img
                className="logo-size"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </div>
            <div>
              <label htmlFor="username-input">USERNAME</label>
              <br />
              <input
                className="input"
                onChange={this.onChangeUsername}
                type="text"
                value={username}
                placeholder="Username"
                id="username-input"
              />
            </div>
            <div>
              <label htmlFor="password-input">PASSWORD</label>
              <br />
              <input
                className="input"
                onChange={this.onChangePassword}
                type="password"
                value={password}
                placeholder="Password"
                id="password-input"
              />
            </div>
            <div>
              <button className="login-btn-styles" type="submit">
                Login
              </button>
            </div>
            {showError ? <p className="error-message">{errorMsg}</p> : null}
          </form>
        </div>
      </>
    )
  }
}
export default Login
