import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTickets, delTickets, addTicket } from "../api/ticketAPI";

const initialState = {
  ticketList: [],
};

export const getTicketsAsync = createAsyncThunk(
  "ticketAPI/getTickets",
  async () => {
    const response = await getTickets();
    return response.data;
  }
);
export const delTicketAsync = createAsyncThunk(
    "ticketAPI/delTickets",
    async (id) => {
      await delTickets(id.id);
      return id.id;
    }
  );
export const addTicketAsync = createAsyncThunk(
"ticketAPI/addTickets",
async (newTicket) => {
    const response = await addTicket(newTicket);
    return response.data;
}
);  

export const ticketSlice = createSlice({
  name: "ticket",
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
    })
    .addCase(delTicketAsync.fulfilled, (state,action) => {
        state.ticketList = state.ticketList.filter(x=> x.id !==  action.payload);
    });  
  },
});

export const selectTickets = (state) => state.ticket.ticketList;
export default ticketSlice.reducer;

