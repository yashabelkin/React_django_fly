import axios from "axios";
const SERVER_TICKETS = "http://127.0.0.1:8000/auth_tickets/";

export function getTickets() {
    let token = localStorage.getItem("token");
    return new Promise((resolve) =>
      axios(SERVER_TICKETS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => resolve({ data: res.data }))
    );
  }

  export const addTicket = (newTicket) => {
    let token = localStorage.getItem("token");
    return new Promise((resolve) =>
      axios.post(SERVER_TICKETS, newTicket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => resolve({data: res.data}))
      );
    }

  export const delTickets = (id) => {
    let token = localStorage.getItem("token");
    return new Promise((resolve) =>
      axios.delete(SERVER_TICKETS+ id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        }).then((res) => resolve(id))
    );
  };

  export const putData = (newProd) => {
    // console.log(newProd);
    return new Promise((resolve) =>
      axios.post(SERVER_TICKETS, newProd).then((res) => resolve(newProd))
    );
  };
  