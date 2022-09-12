import axios from "axios";
const FLIGHTS_SEARCH = "http://127.0.0.1:8000/flights/";
const AIRLINE_SEARCH = "http://127.0.0.1:8000/countries/";
const COUNTRY_SEARCH = "http://127.0.0.1:8000/airline_companies/";


export function getFlights() {
    return new Promise((resolve) =>
      axios(FLIGHTS_SEARCH).then((res) => resolve({ data: res.data }))
    );
  }
  export function getAirlines() {
    return new Promise((resolve) =>
      axios(AIRLINE_SEARCH).then((res) => resolve({ data: res.data }))
    );
  }export function getCounries() {
    return new Promise((resolve) =>
      axios(COUNTRY_SEARCH).then((res) => resolve({ data: res.data }))
    );
  }