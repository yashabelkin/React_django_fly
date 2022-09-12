import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADupAirline, delAirline, fetchData, registerAD, upAirline } from "../api/airlineAPI";

const initialState = {
  airlineList: [],
};
 
export const getAirlines = createAsyncThunk("airlineAPI/fetchData", async () => {
  const response = await fetchData();
  return response.data;
});

export const addAirlineAsync = createAsyncThunk(
  "airline/registerAD",
  async (newAirline) => {
    const response = await registerAD(newAirline);
    return response;
  });
  
export const upAirlineAsync = createAsyncThunk(
  "airline/upAirline",
  async (newAirline) => {
    let newBody = {
      name: newAirline.name,
      country: newAirline.country
    };   
    const response = await upAirline(newBody);
    return response;
  });
  export const ADupAirlineAsync = createAsyncThunk(
    "airline/ADupAirline",
    async (newAirline) => {
      let newBody = {
        name: newAirline.name,
        country: newAirline.country
      };   
      let id = newAirline.id;
      const response = await ADupAirline(newBody, id);
      return response.data;
    });
    export const deleteAirlineAsync = createAsyncThunk(
      "airline/delAirline",
      async (airline) => {
        console.log(airline);
        await delAirline(airline.id);
        return airline.id;
      });

export const airlineSlice = createSlice({
  name: "airline",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAirlines.fulfilled, (state, action) => {
        state.airlineList = action.payload;
      })
    .addCase(addAirlineAsync.fulfilled, (state, action) => {
      state.airlineList.push(action.payload);
      })

    .addCase(ADupAirlineAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      let updatedAir = state.airlineList.find(
        (air) => air.id === action.payload.id
      );
      updatedAir.name = action.payload.name
      updatedAir.country = action.payload.country      
        })
    .addCase(deleteAirlineAsync.fulfilled, (state, action) => {
      console.log(action.payload)
    state.airlineList = state.airlineList.filter(x=> x.id !==  action.payload);
  })
  },

});
// export const { } = mySlice.actions;
export const selectairline = (state) => state.airline.airlineList;
export default airlineSlice.reducer;
 
