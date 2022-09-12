import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFlightAirAsync, addFlightAsync, delAirFlightAsync, getFlights, selectflight } from '../../slicers/flightSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Input, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCountriesAsync, selectcountry } from '../../slicers/countrySlicer';
import { getAirlines, selectairline } from '../../slicers/airlineSlicer';

export const FlightsAD = () => {
    const flightList = useSelector(selectflight);
    const dispatch = useDispatch();
    const [aircomp, setAircomp] = useState("")
    const [depTime, setDepTime] = useState("")
    const [remaningTicket, setRemaningTicket] = useState("")
    const [landTime, setlandTime] = useState("")
    const [destCountry, setDestCountry] = useState("")
    const [originCountry, setOriginCountry] = useState("")
    const countries = useSelector(selectcountry);
    const airlines = useSelector(selectairline);

    useEffect(() => {
      dispatch(getAirlines())
    }, [])  
    useEffect(() => {
        dispatch(getFlights())
      }, [])  
    useEffect(() => {
      dispatch(getCountriesAsync())
  }, [])
  return (
    <div> 
    <div>
    <div className='header'>
    <h1>Admin - Flights</h1>
    </div>
    
    <Table className='table' style={{ width: "70%" }}>
        <TableHead style={{background:'grey', height: "4rem"}}>
          <TableRow>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">id</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">airline company</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">departure time</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">landing time</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">destenation country</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">origin country</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">remaining tickets</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          flightList.map((flight, ind) => (
            <TableRow key={ind}>
              
              <TableCell align="center">
                <p style={{ fontSize: "20px", margin: "5px" }}>{flight.id}</p>
              </TableCell>
              <TableCell align="center">
                <p style={{ fontSize: "20px", margin: "5px" }}>{flight.airline_company}</p>
              </TableCell>
              <TableCell align="center">
                <p style={{ fontSize: "20px", margin: "5px" }}>{flight.departure_time}</p>
              </TableCell>
              <TableCell align="center">
                <p style={{ fontSize: "20px", margin: "5px" }}>{flight.landing_time}</p>
              </TableCell>
              <TableCell align="center">
                <p style={{ fontSize: "20px", margin: "15px" }}>{flight.origin_country}</p>
              </TableCell>
              <TableCell align="center">
                <p style={{ fontSize: "20px", margin: "15px" }}>{flight.destination_country}</p>
              </TableCell>
              <TableCell align="center">
                <p style={{ fontSize: "20px", margin: "15px" }}>{flight.remaining_tickets}</p>
              </TableCell>
              <TableCell align="center">
              <Button color='warning' startIcon={<DeleteIcon />} onClick={()=>dispatch(delAirFlightAsync({id: flight.id}))} style={{ fontSize: "5", margin: "15px" }}>cancel</Button>
              </TableCell>
            </TableRow>
          ))
        }</TableBody>
      </Table>
      

      <br/>
      <div className='logform'>
        <div className="regcover">
          <br/>
      <h2>add flight - Admin</h2>
      <br/>
      <br/>
      airline_company<select
              onChange={(e) => setAircomp(e.target.value)}>
              <option> select Airline </option>
              {airlines.length > 0  && airlines.map((air, i) =>
              <option key={i} value={air.name}>{air.name}</option>
              )}select</select>
              <br/>
      departure time<input type="datetime-local" onChange={(e)=>setDepTime(e.target.value)}></input>
      <br/>
      landing time:  <input type="datetime-local" onChange={(e)=>setlandTime(e.target.value)}></input>
      <br/>
      origin country<select
              onChange={(e) => setOriginCountry(e.target.value)}>
              <option> select country </option>
              {countries.length > 0  && countries.map((count, i) =>
              <option key={i} value={count.name}>{count.name}</option>
              )}select</select>
              <br/>
              
              destenation country<select
              onChange={(e) => setDestCountry(e.target.value)}>
              <option> select country </option>
              {countries.length > 0  && countries.map((count, i) =>
              <option key={i} value={count.name}>{count.name}</option>
              )}select</select>
              <br/>
      remaining tickets:<input onChange={(e)=>setRemaningTicket(e.target.value)}></input>
      <br/>
      <br/>
      <div className="login-btn" onClick={() =>dispatch(addFlightAsync({
          airline_company:aircomp,
          departure_time:depTime,
          landing_time:landTime,
          destination_country:destCountry,
          origin_country:originCountry,
          remaining_tickets:remaningTicket
    
      }))}>submit</div>
    </div>
    </div>
    

    </div></div>
  )
}
