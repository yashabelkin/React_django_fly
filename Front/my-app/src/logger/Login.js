import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {LoginAsync, selectlogin,logout} from '../slicers/loginSlicer'
import "./login.css"
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

const Login = () => {
  const errRef = useRef();
  const dispatch = useDispatch();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const loginStatus = useSelector(selectlogin);
  const [errMsg, setErrMsg] = useState('')
  return (
    
      <div>
      {loginStatus ? (
        <div>
        <div className="header">
          <>are you sure you want to log out?</>
        </div>
                <Button onClick={() => dispatch(logout())}>yes <LogoutIcon></LogoutIcon></Button>{"  "}
                <Link to="/">
                <Button>No <HomeIcon></HomeIcon></Button>
                </Link>
        </div>
      ) : (
        <div className="logform">
        <div className="loge">
          <br/>
            <h1>Login</h1>
            <p ref={errRef} aria-live="assertive">{errMsg} </p>
            <br/>
            <h6>username</h6>
            <input required onChange={(e) => setUser(e.target.value)} type="text" placeholder="" />
            <br/>
            <h6>psw</h6>
            <input required onChange={(e) => setPwd(e.target.value)} type="password" placeholder="" />
            <br></br>
            <div className="login-btn" onClick={() =>
              dispatch(LoginAsync({ username: user, password: pwd }))}>Login</div>
        </div>
    </div>)}
    </div>
    
  );
};

export default Login;