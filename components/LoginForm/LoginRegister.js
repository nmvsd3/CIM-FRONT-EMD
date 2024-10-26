import React from 'react';
import './LoginRegister.css';
import './back.css'

const LoginForm = () => {
  return (
    <>
    <div className='backimg'>
    <img src="./backimg.png" alt="Girl in a jacket" />
        </div>
    <div className="login-container">
      <div className="login-image">
      {/* <img src="./pexels-yosstraore-2526491.jpg" /> */}
      </div>
      <div className="login-form">
        <h2>Sign In</h2>
        <div className="social-icons">
          {/* You can add icons for Facebook and Twitter */}
        </div>
        <form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Username" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn-signin">Sign In</button>
          <div className="options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#">Forgot Password</a>
          </div>
          <p>Not a member? <a href="#">Sign Up</a></p>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
