import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import "./login.css";


const Register_cust = () => {
    const CUST_REGISTER = "http://127.0.0.1:8000/customer_register/"
    const [user, setuser] = useState("")
    const [pswd, setpswd] = useState("")
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [card, setCard] = useState("")


    
  const register = async () => {
    await axios.post(CUST_REGISTER, {
        username: user,
        password: pswd,
        first_name: first,
        last_name: last,
        address: address,
        phone_no: phone,
        credit_card_no: card
    })}
  return (
        
    <div className="logform">
      <div className="regcover">
        <br></br>
        <h2>Customer registration</h2>
        <br></br>
        UserName <input onChange={(e)=>setuser(e.target.value)}></input><br/>
        Password  <input type={'password'}  onChange={(e)=>setpswd(e.target.value)}></input><br/>
        First Name  <input onChange={(e)=>setFirst(e.target.value)}></input><br/>
        Last Name  <input onChange={(e)=>setLast(e.target.value)}></input><br/>
        address  <input onChange={(e)=>setAddress(e.target.value)}></input><br/>
        Phone number  <input onChange={(e)=>setPhone(e.target.value)}></input><br/>
        Credit card  <input onChange={(e)=>setCard(e.target.value)}></input><br/><br/>
        <div className="login-btn" onClick={() =>
              register()}>Register</div>
      </div>
    </div>
    
  );
}

export default Register_cust