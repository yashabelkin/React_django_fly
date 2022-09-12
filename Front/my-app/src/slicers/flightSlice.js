import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAirFlight, addFlight, delAirFlight, fetchData, getAirFlights, updateFlight } from "../api/flightAPI";

const initialState = {
  flightList: [],
  airFlightList: []
};

export const getFlights = createAsyncThunk("flight/fetchData", async () => {
  const response = await fetchData();
  return response.data;
});
 // AIRLINE AUTH
export const getAirFlightsAsync = createAsyncThunk("flight/getAirFlights", async () => {
  const response = await getAirFlights();
  return response.data;
});
export const addFlightAirAsync = createAsyncThunk(
  "flight/addAirFlight",
  async (newFlight) => {
    const response = await addAirFlight(newFlight);
    return response;
  });
  export const delAirFlightAsync = createAsyncThunk(
    "flight/delAirFlight",
    async (flight) => {
      console.log(flight);
      await delAirFlight(flight.id);
      return flight.id;
    });
    

// ADMIN AUTH
export const addFlightAsync = createAsyncThunk(
  "flight/addFlight",
  async (newFlight) => {
    const response = await addFlight(newFlight);
    return response;
  });

  export const updateFlightAsync = createAsyncThunk(
    "flight/updateFlight",
    async (newFlight) => {
      let newBody = {
        airline_company: newFlight.aircompairline_company,
        departure_time:newFlight.departure_time,
        landing_time:newFlight.landing_time,
        destination_country:newFlight.destination_country,
        origin_country:newFlight.origin_country,
        remaining_tickets:newFlight.remaining_tickets
      };   
      let id = newFlight.id
      const response = await updateFlight(newBody, id);
      return response;
    });
  


export const flightSlice = createSlice({
  name: "flight",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFlights.fulfilled, (state, action) => {
        state.flightList = action.payload;
      })
      // AIRLINE
      .addCase(getAirFlightsAsync.fulfilled, (state, action) => {
        state.airFlightList = action.payload;
      })
      .addCase(addFlightAirAsync.fulfilled, (state, action) => {
        state.airFlightList.push(action.payload);
      })
      .addCase(delAirFlightAsync.fulfilled, (state, action) => {
        console.log(action.payload)
      state.airFlightList = state.airFlightList.filter(x=> x.id !==  action.payload);
      state.flightList = state.flightList.filter(x=> x.id !==  action.payload);
      })
      // ADMIN
      .addCase(addFlightAsync.fulfilled, (state, action) => {
        state.flightList.push(action.payload);
      })

      ;
  },

});
export const selectflight = (state) => state.flight.flightList;
export const selectAirflight = (state) => state.flight.airFlightList;
export default flightSlice.reducer;

