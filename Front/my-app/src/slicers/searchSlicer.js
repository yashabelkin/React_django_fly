import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAirlines } from "../api/searchAPI";
import { getTickets, delTickets, addTicket } from "../api/ticketAPI";

const initialState = {
  ticketList: [],
};

export const getCountriesAsync = createAsyncThunk(
  "searchAPI/getCountries",
  async () => {
    const response = await getTickets();
    return response.data;
  }
);
export const getFlightsAsync = createAsyncThunk(
    "searchAPI/getFlights",
    async () => {
      const response = await getTickets();
      return response.data;
    }
  );
  export const getAirlineAsync = createAsyncThunk(
    "searchAPI/getAirline",
    async () => {
      const response = await getAirlines();
      return response.data;
    }
  );
export const ticketSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getTicketsAsync.fulfilled, (state,action) => {
        state.ticketList = action.payload
        console.log(action.payload)
    })
    .addCase(delTicketAsync.fulfilled, (state,action) => {
        state.ticketList = state.ticketList.filter(x=> x.id !==  action.payload);
    });  
  },
});

export const {} = ticketSlice.actions;
export const selectTickets = (state) => state.ticket.ticketList;
export default ticketSlice.reducer;

