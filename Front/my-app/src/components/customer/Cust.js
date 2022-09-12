import axios from 'axios';
import React, { useState } from 'react'

const Cust = () => {
    const UPDATE_CUST = "http://127.0.0.1:8000/update_cust/"
    const [user, setuser] = useState("")
    const [pswd, setpswd] = useState("")
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [card, setCard] = useState("")

    const updateCust = (newAir, id) => {
        let token = localStorage.getItem("token");
        return new Promise((resolve) =>
          axios.put(UPDATE_CUST+ id, newAir, {
            headers: {
              Authorization: `Bearer ${token}`,
            },}).then((res) => resolve({ data: res.data }))
        );};
        
  return (
    <div className="logform">
      <div className="regcover">
        <br></br>
        <h2>Customer Update</h2>
        <br></br>
        UserName <input onChange={(e)=>setuser(e.target.value)}></input><br/>
        Password  <input type={'password'}  onChange={(e)=>setpswd(e.target.value)}></input><br/>
        First Name  <input onChange={(e)=>setFirst(e.target.value)}></input><br/>
        Last Name  <input onChange={(e)=>setLast(e.target.value)}></input><br/>
        address  <input onChange={(e)=>setAddress(e.target.value)}></input><br/>
        Phone number  <input onChange={(e)=>setPhone(e.target.value)}></input><br/>
        Credit card  <input onChange={(e)=>setCard(e.target.value)}></input><br/><br/>
        <div className="login-btn" onClick={() =>
              updateCust({username:user,
                password:pswd,
                first_name:first,
                last_name:last,
                address:address,
                phone_no:phone,
                credit_card_no:card
                })}>Update</div>
      </div>
    </div>
  )
}

export default Cust