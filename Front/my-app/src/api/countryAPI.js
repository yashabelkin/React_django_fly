import axios from "axios";
const SERVER_COUNTRIES = "http://127.0.0.1:8000/countries/";
const SERVER_AUTHCOUNTRIES = "http://127.0.0.1:8000/auth_countries/";

export function fetchData() {
    return new Promise((resolve) =>
      axios(SERVER_COUNTRIES).then((res) => resolve({ data: res.data }))
    );
  }

  export const addCountry = (newCountry) => {
    let token = localStorage.getItem("token");
    return new Promise((resolve) =>
      axios.post(SERVER_AUTHCOUNTRIES, newCountry,{
        headers: {
          Authorization: `Bearer ${token}`,
        },}).then((res) => resolve(newCountry))
    );
  };

  export const delCountry = (id) => {
    let token = localStorage.getItem("token");
    return new Promise((resolve) =>
      axios.delete(SERVER_AUTHCOUNTRIES+ id,{
        headers: {
          Authorization: `Bearer ${token}`,
        },}).then((res) => resolve({ data: res.data }))
    );
  };
  export const upCountry = (newCountry, id) => {
    let token = localStorage.getItem("token");
    return new Promise((resolve) =>
      axios.put(SERVER_AUTHCOUNTRIES+ id, newCountry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },}).then((res) => resolve({ data: res.data }))
    );
  };
  