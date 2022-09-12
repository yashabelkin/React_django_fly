import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData, upCountry, delCountry, addCountry } from "../api/countryAPI";

const initialState = {
  countryList: [],
};

export const getCountriesAsync = createAsyncThunk("APIcountrys/fetchData", async () => {
  const response = await fetchData();
  return response.data;
});
export const addCountryAsync = createAsyncThunk(
  "country/addCountry",
  async (newCountry) => {
    const response =  await addCountry(newCountry);
    
    return response;
  });
  
export const updCountryAsync = createAsyncThunk(
  "country/upCountry",
  async (newCountry) => {
    let newBody = {
      name: newCountry.name,
    };   
    let id = newCountry.id;
    const response = await upCountry(newBody, id);
    return response.data;
  }
);
export const deleteCountryAsync = createAsyncThunk(
  "country/delCountry",
  async (country) => {
    console.log(country);
    await delCountry(country.id);
    return country.id;
  });
  
export const countrySlice = createSlice({
  name: "country",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountriesAsync.fulfilled, (state, action) => {
        state.countryList = action.payload;
      })
      .addCase(addCountryAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.countryList.push(action.payload);
      })
      .addCase(updCountryAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        let updatedCountry = state.countryList.find(
          (country) => country.id === action.payload.id
        );
        updatedCountry.name = action.payload.name
      })
      
      .addCase(deleteCountryAsync.fulfilled, (state, action) => {
        console.log(action.payload)
      state.countryList = state.countryList.filter(x=> x.id !==  action.payload);
    });
  },

});
// export const { } = mySlice.actions;
export const selectcountry = (state) => state.country.countryList;
export default countrySlice.reducer;

