import axios from "axios";
const url = "http://127.0.0.1:8000/flights/";
const FLIGHT_ADMIN = "http://127.0.0.1:8000/admin_flights/";
const FLIGHT_AIR = "http://127.0.0.1:8000/auth_flights/";

export function fetchData() {
    return new Promise((resolve) =>
      axios(url).then((res) => resolve({ data: res.data }))
    );
  }
      // AIRLINE
export function getAirFlights() {
  let token = localStorage.getItem("token");
  return new Promise((resolve) =>
    axios(FLIGHT_AIR, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))
  );
  }
  export const addAirFlight = (newFlight) => {
    let token = localStorage.getItem("token");
    // console.log(newProd);
    return new Promise((resolve) =>
      axios.post(FLIGHT_AIR, newFlight , {
        headers: {
          Authorization: `Bearer ${token}`,
   } },).then((res) => resolve(newFlight))
    );
  };
  export const delAirFlight = (id) => {
    let token = localStorage.getItem("token");
    return new Promise((resolve) =>
      axios.delete(FLIGHT_AIR+ id,{
        headers: {
          Authorization: `Bearer ${token}`,
        },}).then((res) => resolve({ data: res.data }))
    );
  };


    // ADMIN
  export const addFlight = (newFlight) => {
    let token = localStorage.getItem("token");
    // console.log(newProd);
    return new Promise((resolve) =>
      axios.post(FLIGHT_ADMIN, newFlight , {
        headers: {
          Authorization: `Bearer ${token}`,
   } },).then((res) => resolve(newFlight))
    );
  };

  export const delData = (id) => {
    // console.log(newProd);
    return new Promise((resolve) =>
      axios.delete(url+ id).then((res) => resolve(id))
    );
  };
  export const updateFlight = (newFlight, id) => {
    let token = localStorage.getItem("token");
    return new Promise((resolve) =>
      axios.put(FLIGHT_ADMIN+id , newFlight, {
        headers: {
          Authorization: `Bearer ${token}`,
   } },).then((res) => resolve({ data: res.data }))
    );
  };
  