import { useState } from 'react'
import axios from 'axios'
import apiUrl from '../api.jsx' // import the api url

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${apiUrl}/login`, formData)
      if (res.data.success) {
        // redirect to home page
        window.location.href = '/home'
      } else {
        alert('invalid email or password')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section>
      <div className='login-box'>
        <form onSubmit={handleSubmit} id='loginForm'>
          <h2 id='loginH2'>Login</h2>

          <div className='input-box'>
            <span className='icon'>
              <ion-icon name='mail'></ion-icon>
            </span>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>

          <div className='input-box'>
            <span className='icon'>
              <ion-icon name='lock-closed'></ion-icon>
            </span>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>

          <div className='remember-forgot'>
            <label>
              <input type='checkbox' />
              Remember me
            </label>
            <a href='#'>Forgot password</a>
          </div>

          <button type='submit' id='loginButton'>Login</button>

          <div className='register-link'>
            <p>
              Don't have an account?
              <a href='/register'> Register</a>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login
