import React, { useState } from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {

  const navigate = useNavigate();

  const {loading,handleLogin} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({email,password});
    navigate('/');
  }

  if(loading){
    (<main><h1>Loading.......</h1></main>)
  }

  return (
    <main>
      <div className="form-container">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email" id='email' name='email' placeholder='Email' />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password" id='password' name='password' placeholder='Password' />
          </div>

          <button onClick={handleSubmit} className='button primary-button'>Login</button>

        </form>

        <p>Don't have an account? <Link to={'/register'}>Register</Link></p>

      </div>
    </main>
  )
}