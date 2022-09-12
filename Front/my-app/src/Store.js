import { configureStore } from '@reduxjs/toolkit';
import  airlineReducer  from './slicers/airlineSlicer';
import countryReducer from './slicers/countrySlicer';
import flightReducer from './slicers/flightSlice';
import loginReducer from './slicers/loginSlicer';
import ticketReducer from './slicers/ticketSlicer';


export const store = configureStore({
  reducer: {
    flight:flightReducer,
    airline:airlineReducer,
    country:countryReducer,
    login:loginReducer,
    ticket:ticketReducer,
    },
})