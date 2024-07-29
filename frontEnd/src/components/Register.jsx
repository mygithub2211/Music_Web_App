import React, { useState } from "react";
import axios from "axios";
import apiUrl from "../api"; // Import the API URL

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/register`, formData);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return ( 
    <section>
      <div className="register-box">
        <form onSubmit={handleSubmit} id="registerForm">
          <h2 id="registerH2">Register</h2>

          <div className="input-box-register">
            <span className="icon2"></span>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required/><br/>
            <label>First Name</label>
          </div>
          
          <div className="input-box-register">
            <span className="icon2"></span>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required/><br/>
            <label>Last Name</label>
          </div>

          <div className="input-box-register">
            <span className="icon2"></span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required/><br/>
            <label>Email</label>
          </div>
          
          <div className="input-box-register">
            <span className="icon2"></span>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required /><br/>
            <label>Password</label>
          </div>
          
          <button type="submit" id="registerButton">Register</button>

          <div className="login-link">
            <p>Have an account?<a href="/"> Log In</a></p>
          </div>
          
        </form>
      </div>
    </section>
  );
};

export default Register;
