import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getFlights, selectflight } from '../../slicers/flightSlice';
import { selectlogin } from '../../slicers/loginSlicer';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../App.css';
import { Grid } from "@mui/material";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { addTicketAsync } from '../../slicers/ticketSlicer';
import { Link as Redirect } from "react-router-dom";

const DisplayFlights = () => {
  const loginStatus = useSelector(selectlogin);
  const flightList = useSelector(selectflight);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getFlights())
  }, [])
  return (
    <div >
      <div className='header'><h1>All Flights</h1></div>
      <div className='all'>
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 18 }}>
            {flightList.map((flight, ind) => <Grid item xs={2} sm={4} md={4} key={ind}>
            <Card 
            sx={{ maxWidth: 345 }}>
            <CardMedia
            component="img"
            height="170"
            image= {require(`../../assets/${flight.airline_company}.png`)}
            
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
            <Typography variant="body1" color="text.primary">
            
            </Typography>

            </CardContent>
            <CardActions>
            {loginStatus ?<Button onClick={()=> dispatch(addTicketAsync({flight: flight.id}))}variant='contained' size="small">Book this flight</Button>:
            <Button variant='outlined' color='inherit' as={Redirect} to={"/login"}>login to book </Button>}
      </CardActions>
    </Card>
     
    </Grid>)}
                </Grid>
                </div>
                



</div>
)
}


export default DisplayFlights