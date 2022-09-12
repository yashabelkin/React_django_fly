import axios from "axios";
const SERVER_AIRLINE = "http://127.0.0.1:8000/airline_companies/";
const AUTH_AIRLINE = "http://127.0.0.1:8000/auth_airline/";
const ADMIN_AIRLINE = "http://127.0.0.1:8000/admin_airline/"
export function fetchData() {
    return new Promise((resolve) =>
      axios(SERVER_AIRLINE).then((res) => resolve({ data: res.data }))
    );
  }

  export const addAirline = (newAirline) => {
    let token = localStorage.getItem("token");
    return new Promise((resolve) =>
      axios.post(AUTH_AIRLINE, newAirline, {
        headers: {
          Authorization: `Bearer ${token}`,
        },}).then((res) => resolve(newAirline))
    );
  };
  export const registerAD = (newAirline) => {
    let token = localStorage.getItem("token");
    return new Promise((resolve) =>
     axios.post(ADMIN_AIRLINE, newAirline, {
      headers: {
        Authorization: `Bearer ${token}`,
      },}).then((res) => resolve(newAirline))
      
      );};

  export const delAirline = (id) => {
    let token = localStorage.getItem("token");
    return new Promise((resolve) =>
      axios.delete(ADMIN_AIRLINE+ id,{
        headers: {
          Authorization: `Bearer ${token}`,
        },}).then((res) => resolve(id))
        
    );
  };




  export const upAirline = (newAir, id) => {
    let token = localStorage.getItem("token");
    return new Promise((resolve) =>
      axios.put(AUTH_AIRLINE+ id, newAir, {
        headers: {
          Authorization: `Bearer ${token}`,
        },}).then((res) => resolve({ data: res.data }))
    );
    };
        // admin
        export const ADupAirline = (newAir, id) => {
          let token = localStorage.getItem("token");
          return new Promise((resolve) =>
            axios.put(ADMIN_AIRLINE+ id, newAir, {
              headers: {
                Authorization: `Bearer ${token}`,
              },}).then((res) => resolve({ data: res.data }))
          );
          };