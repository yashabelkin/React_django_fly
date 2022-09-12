import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import "./login.css"

const Register_air = () => {
    const AIRLINE_REGISTER = "http://127.0.0.1:8000/airline_register/"
    const [user, setuser] = useState("")
    const [pswd, setpswd] = useState("")
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    
    
    const navigate = useNavigate();

    const handleSubmit = event => {
      event.preventDefault();
  
      // 👇️ redirect to /
      navigate('/login');
    };
  const register = async () => {
    await axios.post(AIRLINE_REGISTER, {
        username: user,
        password: pswd,
        name: name,
        country: country,
        
    })}
  return (
        
    <div className="logform">
      <div className="regcoverair">
       
        <br></br>
        <h2>Airline Company registration</h2>
        
        UserName <input onChange={(e)=>setuser(e.target.value)}></input><br/>
        Password  <input type={'password'}  onChange={(e)=>setpswd(e.target.value)}></input><br/>
        Airline name  <input onChange={(e)=>setName(e.target.value)}></input><br/>
        Country  <input onChange={(e)=>setCountry(e.target.value)}></input><br/><br/>
        <div className="login-btn" onSubmit={handleSubmit} onClick={() =>
              register()}>Register</div>
        
        </div>
    </div>
    
  );
}

export default Register_air