import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAirlineAsync, getData, selectairline, upAirlineAsync } from '../../slicers/airlineSlicer'
import { selectIs_admin } from '../../slicers/loginSlicer'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { getCountriesAsync, selectcountry } from '../../slicers/countrySlicer';


const AirSet = () => {
  const [airName, setAirName] = useState("")
  const [airCountry, setAirCountry] = useState("")
  const dispatch = useDispatch()
  const is_admin = useSelector(selectIs_admin)
  const countries = useSelector(selectcountry);
  useEffect(() => {
    dispatch(getCountriesAsync())
  }, [])

  return (
    <div>
{is_admin ? 
<div className='header'>You are not an airline company.. <br/>
<Link variant='outlined' as={Link} to={"/flights_admin"}>Admin Area</Link>
</div>: 
<div className='logform'>
    <div className='cover'>
    <h2>update profile</h2>    
    <br/>
    <br/>
    new airline name<input onChange={(e)=>setAirName(e.target.value)}></input>
    <br/>
    country<select
              onChange={(e) => setAirCountry(e.target.value)}>
              <option> select country </option>
              {countries.length > 0  && countries.map((count, i) =>
              <option key={i} value={count.name}>{count.name}</option>
              )}select</select>
    <br/>
    <br/>

    <Button variant="contained" onClick={() => dispatch(upAirlineAsync({name:airName, country:airCountry}))}>submit</Button>
    
    </div>
</div>}            
    </div>



  )
}

export default AirSet