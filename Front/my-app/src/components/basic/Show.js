import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getData, selectflight, addFlightAsync } from '../../slicers/flightSlice';
import { selectlogin } from '../../slicers/loginSlicer';
import { addTicketAsync } from '../../slicers/ticketSlicer';

const DisplayFlights = () => {
  const loginStatus = useSelector(selectlogin);
  const flightList = useSelector(selectflight);
  const dispatch = useDispatch();
  const [aircomp, setAircomp] = useState("")
  const [depTime, setDepTime] = useState("")
  const [remaningTicket, setRemaningTicket] = useState("")
  const [landTime, setlandTime] = useState("")
  const [destCountry, setDestCountry] = useState("")
  const [originCountry, setOriginCountry] = useState("")


  useEffect(() => {
    dispatch(getData())
  }, [])
  return (
    <div>
<h1>Flights and Companies</h1>
{flightList.map((flight, ind) => <div key={ind}>
  <hr></hr>flight: <hr></hr>
  airline company: {flight.airline_company} {" "} <br></br>
  departure time: {flight.departure_time}{"  "}<br></br>
  destination country: {flight.destination_country} {"  "}<br></br>
  landing time: {flight.landing_time}{"  "}<br></br>
  origin_country: {flight.origin_country} {"  "}<br></br>
  <button onClick={()=> dispatch(addTicketAsync({flight: flight.id}))}>buy this flight</button>
  </div>)}
  <br/>
  <h2>add flight - Admin</h2>
  airline_company<input type="date" onChange={(e)=>setAircomp(e.target.value)}></input>
  departure time<input type="date" onChange={(e)=>setDepTime(e.target.value)}></input>
  departure time<input type="date" onChange={(e)=>setDepTime(e.target.value)}></input>
  landing time:  <input type="date" onChange={(e)=>setlandTime(e.target.value)}></input>
  destination country <input onChange={(e)=>setDestCountry(e.target.value)}></input>
  origin country:<input onChange={(e)=>setOriginCountry(e.target.value)}></input>
  remaining tickets:<input onChange={(e)=>setRemaningTicket(e.target.value)}></input>

  <button onClick={()=>dispatch(addFlightAsync({
      airline_company:aircomp,
      departure_time:depTime,
      landing_time:landTime,
      destination_country:destCountry,
      origin_country:originCountry,
      remaining_tickets:remaningTicket

  }))}>submit</button>



</div>
)
}


export default DisplayFlights