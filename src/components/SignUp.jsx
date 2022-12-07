import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import LockRound from "@mui/material/Icon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  Divider,
  Button,
  CardContent,
  CssBaseline,
  Grid,
  Avatar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import firebase from "../firebase";
import { auth } from "../firebase";
import { async } from "@firebase/util";
import { createUserWithEmailAndPassword } from "firebase/auth";

// ];
function SignUp(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    city: "",
    salary: "",
    gender: "",
    hobbies: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createUserDocument = async (user, formData) => {
    if (!user) return;

    const { email } = formData;
    const { password } = formData;
    const { fname } = formData;
    const { lname } = formData;
    const { city } = formData;
    const { salary } = formData;
    const { gender } = formData;
    const { hobbies } = formData;
    const { type } = formData;
    const uid = user.user.uid;
    console.log(user);

    await setDoc(doc(db, `Employee`, `${user?.user.uid}`), {
      email,
      password,
      fname,
      lname,
      city,
      salary,
      gender,
      hobbies,
      type,
      uid,
      dept: "",
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("email", formData.email, "pass", formData.password);

    await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    )
      .then((res) => {
        if (res) {
          createUserDocument(res, formData);
          console.log("res", res, "hi", formData);
          props.toggle();
          toast.success("User Register Successfully");
        }
      })
      .catch((error) => {
        console.log("error", error);
        switch (error.code) {
          case "email-already-use-in":
            toast.error(error.message);
            break;
          case "invalid-email":
            toast.error(error.message);
            break;
        }
      });
  };
  return (
    <div>
      <CardContent>
        <div className="center">
          <h3>Sign Up</h3>

          <form onSubmit={(e) => handleSignUp(e)}>
            <TextField
              style={{ marginRight: "60px" }}
              name="fname"
              id="outlined-basic"
              label="First Name"
              type="text"
              variant="standard"
              value={formData.fname}
              required
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <TextField
              name="lname"
              id="outlined-basic"
              label="Last Name"
              type="text"
              variant="standard"
              value={formData.lname}
              required
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <br />
            <br />
            <TextField
              style={{ marginRight: "60px" }}
              name="email"
              id="outlined-basic"
              label="Email"
              type="email"
              variant="standard"
              validators={["required", "isEmail"]}
              value={formData.email}
              required
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <TextField
              id="filled-basic"
              name="password"
              variant="standard"
              type="password"
              label="Password"
              value={formData.password}
              required
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <br />
            <br />
            <TextField
              style={{ marginRight: "60px" }}
              id="outlined-basic"
              name="city"
              value={formData.city}
              onChange={(e) => {
                handleChange(e);
              }}
              label="City"
              variant="standard"
            />
            <TextField
              style={{ marginRight: "20px" }}
              id="outlined-basic"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={(e) => {
                handleChange(e);
              }}
              label="Salary"
              variant="standard"
            />
            <br /> <br />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
              <hr />
            </FormControl>
            <br /> <br />
            <br />
            <br />
            <Box sx={{ Width: "100px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="type"
                  label="Type"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <MenuItem value="manager">Manager Access</MenuItem>
                  <MenuItem value="employee">Employee Access</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <br />
            <Button type="submit" variant="outlined">
              Sign Up
            </Button>
            <br />
            <br />
            <Divider />
            <Grid>
              <Link onClick={props.toggle} className="account">
                ALready a User ? Login
              </Link>
            </Grid>
          </form>
        </div>
      </CardContent>
    </div>
  );
}

export default SignUp;
