import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Input from '@mui/material/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesAsync, selectcountry } from './slicers/countrySlicer';
import { getFlights, selectflight } from './slicers/flightSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './App.css';
import { Grid, requirePropFactory } from "@mui/material";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { selectlogin } from './slicers/loginSlicer';
import { addTicketAsync } from './slicers/ticketSlicer';
import { Link as Redirect } from "react-router-dom";
import {Link as Scroll} from 'react-scroll'

const grey1 = grey[400];
const grey2 = grey[300];



const Test = () => {
  const [origing, setOrigin] = useState('')
  const [des, setDes] = useState('')
  const [dep, setDep] = useState('')
  const [land, setLand] = useState('')

  const flightList = useSelector(selectflight);
  const countries = useSelector(selectcountry);
  const dispatch = useDispatch()
  const loginStatus = useSelector(selectlogin);

  useEffect(() => {
    dispatch(getCountriesAsync())
  }, [])



  return (
    <div>
      <div className='list'>
      <Box
        sx={{
          borderRadius: '16px',
          borderColor: 'text.primary',
          margin: 'auto',
          padding: '10px',
          width: 500,
          height: 500,
          alignContent:'center',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: grey2,
          '&:hover': {
            backgroundColor: grey1,
            opacity: [0.5, 0.8, 0.9],
          },
        }}>
        <div>
          <h2>search a flight</h2>
            <h6>from</h6><select
              onChange={(e) => setOrigin(e.target.value)}>
              <option> select country </option>
              {countries.length > 0  && countries.map((count, i) =>
              <option key={i} value={count.name}>{count.name}</option>
              )}select</select>
              <TravelExploreIcon></TravelExploreIcon>
            {" "}
            <h6>to</h6><select
              onChange={(e) => setDes(e.target.value)}>
                <option>select country </option>
              {countries.length > 0  && countries.map((count, i) =>
              
                <option key={i} value={count.name}>{count.name}</option>
                
              )}</select><TravelExploreIcon></TravelExploreIcon>
              <br /><br />
          <h5>dep time :</h5 > <FlightTakeoffIcon></FlightTakeoffIcon>  {" "}<Input onChange={(e)=> setDep(e.target.value)} type='date' ></Input><hr></hr>
          <h5>land time :</h5  ><FlightLandIcon></FlightLandIcon> {" "}<Input onChange={(e)=> setLand(e.target.value)} type='date' ></Input><hr></hr>
          <Scroll to="searched" onClick={()=> dispatch(getFlights())}><Button variant='outlined'>Search</Button> </Scroll>
        </div>
      </Box>

      </div>
      
      <div id="searched">
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 18 }}>
            {flightList.filter(x=> x.origin_country.includes(origing) &&  x.destination_country.includes(des)&&
            x.departure_time.includes(dep)&&x.landing_time.includes(land))
            .map((flight, i) => (
            <Grid item xs={2} sm={4} md={4} key={i}>
            <Card 
            sx={{ maxWidth: 345 }}>
            <CardMedia
            component="img"
            height="170"
            image= {require(`./assets/${flight.airline_company}.png`)}
            alt="AIRIMG"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {flight.origin_country} <TrendingFlatIcon/> {flight.destination_country}
            </Typography>
            <Typography variant="body1" color="text.primary">
            AIRLINE COMPANY : {flight.airline_company}
            </Typography>
            <Typography variant="body1" color="text.primary">
            DEPARTURE TIME : {flight.departure_time}
            </Typography>
            <Typography variant="body1" color="text.primary">
            LANDING TIME : {flight.landing_time}
            </Typography>
            <Typography variant="body1" color="text.primary">
            </Typography>
            </CardContent>
            <CardActions>
            {loginStatus ?<Button onClick={()=> dispatch(addTicketAsync({flight: flight.id}))}variant='contained' size="small">Book this flight</Button>:
            <Button variant='outlined' color='inherit' as={Redirect} to={"/login"}>login to book </Button>}
      </CardActions>
    </Card>
    </Grid>))}
                </Grid>
                </div>
                 
    </div>
    

  )
}

export default Test