import axios from "axios";
const MY_SERVER_LOG = "http://127.0.0.1:8000/token/";


export function logIn(auth) {
  return new Promise((resolve) =>
    axios
      .post(MY_SERVER_LOG, auth)
      .then((res) => resolve({ data: res.data }))
  );
}


