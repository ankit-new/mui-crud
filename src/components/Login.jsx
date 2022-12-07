import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import LockRound from "@mui/material/Icon";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ToastContainer, toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CardContent,
  CssBaseline,
  Divider,
  Grid,
} from "@mui/material";
import "../App.css";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import { async } from "@firebase/util";

function Login(props) {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleCheck = (e) => {
    setRememberMe(e.target.checked);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;
      console.log(uid);
      const q = query(collection(db, "Employee"), where("uid", "==", uid));
      const docs = await getDocs(q);

      const type = docs.docs[0].data().type;
      console.log("type", type);

      if (type) {
        type === "manager" ? Navigate(`/manager`) : Navigate(`/employee`);
      } else {
        return "No user Found";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ top: "50px" }}>
      {/* <h2>Login Login</h2> */}

      <div>
        <h3>Login</h3>

        <form onSubmit={(e) => handleLogin(e)}>
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="standard"
            validators={["required", "isEmail"]}
            value={email}
            required
            onChange={(e) => {
              handleEmail(e);
            }}
          />
          <br />
          <br />
          <TextField
            id="filled-basic"
            name="password"
            variant="standard"
            type="password"
            label="Enter password"
            value={password}
            required
            onChange={(e) => {
              handlePassword(e);
            }}
          />
          <br />
          <FormControlLabel
            control={
              <Checkbox value={rememberMe} onChange={(e) => handleCheck(e)} />
            }
            label="Remember Me"
          ></FormControlLabel>
          <br />
          <br />
          <Button type="submit" variant="outlined">
            Login
          </Button>
          <br />
          <br />
          <Divider />
          <Grid>
            <Link onClick={props.toggle} className="account">
              New User? Sign Up
            </Link>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default Login;
