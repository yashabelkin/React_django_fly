import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAirlineAsync, ADupAirlineAsync, deleteAirlineAsync, getAirlines, selectairline } from '../../slicers/airlineSlicer'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Input, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { selectcountry } from '../../slicers/countrySlicer';

const AirlineAD = () => {
    const airline_companies = useSelector(selectairline)
    const [airName, setAirName] = useState("")
    const [airCountry, setAirCountry] = useState("")
    const [user, setuser] = useState("")
    const [pswd, setpswd] = useState("")
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const countries = useSelector(selectcountry);


    const dispatch = useDispatch()
    useEffect(() => {
      dispatch( getAirlines())
    }, [])
  return (
    <div>
    <div className='header'>
    <h1>Admin - Airlines</h1>
</div>
<div>


<Table className='table' style={{ width: "70%" }}>
<TableHead style={{background:'grey', height: "4rem"}}>
<TableRow>
<TableCell style={{ fontSize: "20px", color:'white'}}align="center">ID</TableCell>
<TableCell style={{ fontSize: "20px", color:'white'}}align="center">AIRLINE NAME</TableCell>
<TableCell style={{ fontSize: "20px", color:'white'}}align="center">COUNTRY</TableCell>
<TableCell style={{ fontSize: "20px", color:'white'}}align="center">Update country</TableCell>

</TableRow>
</TableHead>
<TableBody>
{
airline_companies.map((airline,ind) => (
<TableRow key={ind}>
  <TableCell align="center">
    <p style={{ fontSize: "13px", margin: "5px" }}>{airline.id}</p>
  </TableCell>
  <TableCell align="center">
    <p style={{ fontSize: "20px", margin: "15px" }}>{airline.name}</p>
  </TableCell>
  <TableCell align="center">
    <p style={{ fontSize: "20px", margin: "15px" }}>{airline.country}</p>
  </TableCell>
  <TableCell align="center">
  Name:<Input onChange={(e) => setAirName(e.target.value)}></Input>
  Country:<Input onChange={(e) => setAirCountry(e.target.value)}></Input>
  <Button variant="outlined" color="inherit" onClick={()=> dispatch(ADupAirlineAsync({name:airName, country:airCountry, id:airline.id, user:airline.user}))}> Update </Button>
        <Button onClick={()=>dispatch(deleteAirlineAsync({id:airline.id}))} color='warning' startIcon={<DeleteIcon />}>delete</Button>
  </TableCell>
</TableRow>
))
}</TableBody>
</Table>
</div>
<div className='page'>
<div className='cover'>
        <br></br>
        <h2>add airline</h2>
        <br></br>
        UserName <input onChange={(e)=>setuser(e.target.value)}></input><br/>
        Password  <input type={'password'}  onChange={(e)=>setpswd(e.target.value)}></input><br/>
        Airline name  <input onChange={(e)=>setName(e.target.value)}></input><br/>
        Country  <select
              onChange={(e) => setCountry(e.target.value)}>
              <option> select country </option>
              {countries.length > 0  && countries.map((count, i) =>
              <option key={i} value={count.name}>{count.name}</option>
              )}select</select><br/><br/>
        
        <Button type="submit" onClick={()=>dispatch(addAirlineAsync({
          username:user,password:pswd, name:name, country:country}))}>Register</Button>
    </div>
</div>
</div>
  )
}

export default AirlineAD