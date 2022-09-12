import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getData, addFlightAsync, getAirFlightsAsync, selectAirflight, delAirFlightAsync, addFlightAirAsync } from '../../slicers/flightSlice';
import { selectIs_admin, selectlogin } from '../../slicers/loginSlicer';
import { addTicketAsync } from '../../slicers/ticketSlicer';
import { Button } from '@mui/material';
import { addAirFlight } from '../../api/flightAPI';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getCountriesAsync, selectcountry } from '../../slicers/countrySlicer';
import DeleteIcon from '@mui/icons-material/Delete';

const AirFlights = () => {
  const loginStatus = useSelector(selectlogin);
  const airflightList = useSelector(selectAirflight);
  const dispatch = useDispatch();
  const [aircomp, setAircomp] = useState("")
  const [depTime, setDepTime] = useState("")
  const [remaningTicket, setRemaningTicket] = useState("")
  const [landTime, setlandTime] = useState("")
  const [destCountry, setDestCountry] = useState("")
  const [originCountry, setOriginCountry] = useState("")
  const is_admin = useSelector(selectIs_admin)
  const countries = useSelector(selectcountry);
  useEffect(() => {
    dispatch(getCountriesAsync())
  }, [])

  useEffect(() => {
    dispatch(getAirFlightsAsync())
  }, [])
  return (
    <div>
{is_admin ? <div className='header'>You are not an airline company.. <br/>
<Link variant='outlined' as={Link} to={"/flights_admin"}>Admin Area</Link>
</div>:   
<div>
    <div className='header'>
    <h1>Flights - Airline</h1>
    </div>
    
    <Table className='table' style={{ width: "70%" }}>
        <TableHead style={{background:'grey', height: "4rem"}}>
          <TableRow>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">id</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">airline company</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">departure time</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">landing time</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">origin country</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">destenation country</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">remaining tickets</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">actions</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
        {
          airflightList.map((flight,ind) => (
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
                <p style={{ fontSize: "20px", margin: "15px" }}>{flight.destination_country}</p>
              </TableCell>
              <TableCell align="center">
                <p style={{ fontSize: "20px", margin: "15px" }}>{flight.origin_country}</p>
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
      <div className='logform'>
        <div className="regcoverair">
    <h2>add flight - Airline</h2>
      departure time<input type="datetime-local" onChange={(e)=>setDepTime(e.target.value)}></input>
      landing time  <input type="datetime-local" onChange={(e)=>setlandTime(e.target.value)}></input>
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
      remaining tickets:<input onChange={(e)=>setRemaningTicket(e.target.value)}></input>
    <br/>
      <Button onClick={()=>dispatch(addFlightAirAsync({
          airline_company:aircomp,
          departure_time:depTime,
          landing_time:landTime,
          destination_country:destCountry,
          origin_country:originCountry,
          remaining_tickets:remaningTicket
    
      }))}>submit</Button>
</div>
</div>
    </div>}

</div>
)
}


export default AirFlights