import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAirlines, selectairline } from '../../slicers/airlineSlicer';
import { getCountriesAsync, selectcountry } from '../../slicers/countrySlicer';
import { addFlightAirAsync, addFlightAsync, delAirFlightAsync, getFlights, selectflight, updateFlightAsync } from '../../slicers/flightSlice';

const FlightUpdate = () => {
    const flightList = useSelector(selectflight);
    const dispatch = useDispatch()
    const [flight, setflight] = useState("");
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
            <div className='logform'>
        <div className="regcover">
          <br/>
      <h2>Update flight - Admin</h2>
      <br/>
      Flight Number<select
              onChange={(e) => setflight(e.target.value)}>
              <option> select flight </option>
              {flightList.length > 0  && flightList.map((flight, i) =>
              <option key={i} value={flight.id}>{flight.id}</option>
              )}select</select>
              <br/>
      airline company<select
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
      <div className="login-btn" onClick={() =>dispatch(updateFlightAsync({
          id: flight,
          airline_company:aircomp,
          departure_time:depTime,
          landing_time:landTime,
          destination_country:destCountry,
          origin_country:originCountry,
          remaining_tickets:remaningTicket
    
      }))}>submit</div>
    </div>
    </div>
    
    </div>
  )
}

export default FlightUpdate