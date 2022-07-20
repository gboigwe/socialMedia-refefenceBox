import React, { useState } from 'react'
import './Auth.css';
import Logo from '../../img/logo.png'

import { logIn, signUp } from '../../actions/AuthAction.js';
import { useDispatch, useSelector } from 'react-redux'

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "", 
    username: "", 
    password: "", 
    confirmpass: ""
  }
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.authReducer.loading)
  
  const [confirmPass, setConfirmPass] = useState(true)
  const [isSignUp, setIsSignUp] = useState(true);
  console.log(loading);

  const [data, setData] = useState(initialState);

  const resetForm = () => {
    setData(initialState)
    setConfirmPass(true)
  };

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false)
    } else {
      dispatch(logIn(data))
    }
  };

  return (
    <div className='Auth'>
      {/* Left Side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Reference Box</h1>
          <h6>Contribute to innovate a better techiverse</h6>
        </div>
      </div>
      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit} > 
          <h3> {isSignUp ? "Sign Up" : "Log in"} </h3>
          {isSignUp && (
            <div>
              <input type="text" placeholder='First Name' className='infoInput' name='firstname' onChange={handleChange} value={data.firstname} />
              <input type="text" placeholder='Last Name' className='infoInput' name='lastname' onChange={handleChange} value={data.lastname} />
            </div>
          )}

          <div>
            <input type="text" className='infoInput' name='username' placeholder='Username' onChange={handleChange} value={data.username} />
          </div>

          <div>
            <input type="password" className='infoInput' name='password' placeholder='Password' onChange={handleChange} value={data.password} />
            {isSignUp && (
              <input type="password" className='infoInput' name='confirmpass' placeholder='Confurm Password' onChange={handleChange} value={data.confirmpass} />
            )}
          </div>
          <span style={{ display: confirmPass ? 'none' : 'block', color: 'red', fontSize: '12px', alignSelf: 'flex-end', marginRight: '5px' }} >* Confirm Password is not the same</span>

          <span style={{ fontSize: '12px', cursor: 'pointer' }} onClick={() => {setIsSignUp((prev)=>!prev); resetForm() }} >{isSignUp ? "Already have an account? Login" : "Don't have an account? SignUp"}  </span>
          <button className='button infoButton' type='submit' disabled={loading} >{loading? 'Loding...' : isSignUp ? 'Sign Up' : 'Login'}</button>
        </form>
      </div>
    </div>
  )
}

export default Auth