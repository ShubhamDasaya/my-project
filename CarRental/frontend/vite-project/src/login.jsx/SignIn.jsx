import React from 'react'

const SignIn = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-dark">
    <div className="card p-4 text-white bg-opacity-25" style={{ width: "22rem", backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
      <h3 className="text-center">Login Here</h3>
      <input 
        type="text" 
        placeholder="Email or Phone" 
        className="form-control my-2"
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="form-control my-2"
      />
      <button className="btn btn-light w-100 my-3">Log In</button>
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-outline-light"><i className="fab fa-google"></i> Google</button>
        <button className="btn btn-outline-light"><i className="fab fa-facebook"></i> Facebook</button>
      </div>
    </div>
  </div>
  )
}

export default SignIn

