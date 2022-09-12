import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketsAsync, selectTickets, delTicketAsync } from "../../slicers/ticketSlicer";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ticketimg from '../../static//images/ticket.jpeg'
import '../../App.css';
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { selectUsername } from "../../slicers/loginSlicer";
import { blue } from '@mui/material/colors';
import AirlinesIcon from '@mui/icons-material/Airlines';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';



const Tickets = () => {
    const dispatch = useDispatch();
    const tickets = useSelector(selectTickets);
    const userName = useSelector(selectUsername);
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '120%',
        maxHeight: '200%',
      });
    useEffect(() => {
        dispatch(getTicketsAsync())
    }, [])

    return (
      <div>
      <div className="header"><h2>My Orders</h2></div>
        <div className="list">

         
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 18 }}>

{tickets.map((ticket, ind) => <Grid item xs={2} sm={4} md={6} key={ind}>
    <Paper 
      sx={{
        p: 7,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }} 
        
    >
        
      <Grid container spacing={2}>
      
        <Grid item>
          <ButtonBase sx={{ width: 150, height: 128 }}>
            <Img alt="air" src={ticketimg} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h6" component="div">
                Flight Ticket
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
            PASSENGER: {userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              FLIGHT ID: {ticket.flight.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {ticket.flight.origin_country.name} <TrendingFlatIcon/> {ticket.flight.destination_country.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              DATE: {ticket.flight.departure_time}
              </Typography>

            </Grid>
            <Grid item>
              <Button onClick={()=>dispatch(delTicketAsync({id:ticket.id}))} sx={{ cursor: 'pointer' }} variant="outlined" color="error">
                cancel
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography color={blue[700]} variant="secondary" component="div">
            <AirlinesIcon/>  {ticket.flight.airline_company.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
        </Paper>
    

        </Grid>)}
        </Grid>
        </div>
        </div>
        
    );
};

export default Tickets;
