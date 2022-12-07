import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TableHead from "@mui/material/TableHead";
import { useNavigate } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import { Container, Button, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { db } from "../firebase";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  startAt,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import DropDown from "../components/DropDown";
import { Navigate } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Manager(props) {
  const Navigate = useNavigate();
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  };
  const { formData } = props;
  const [rows, setRows] = useState([]);
  const [depts, setDepts] = useState("");
  const [querys, setQuerys] = useState(null);

  const logOut = (e) => {
    e.preventDefault();
    Navigate("/");
  };
  const handleQuery = async (e) => {
    setQuerys(e.target.value);
    let aa = e.target.value;
    if (aa == "1") {
      console.log("1");
      const queryRef = query(
        collection(db, "Employee"),
        where("type", "==", "employee"),
        where("dept", "==", "HR"),
        orderBy("salary", "desc")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(checkQuery);
      setRows(checkQuery);
      // setaa(checkQuery);
      return checkQuery;
    } else if (aa == "2") {
      console.log("2");
      const queryRef = query(
        collection(db, "Employee"),
        where("type", "==", "employee"),
        where("dept", "==", "It")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("checkQuery", checkQuery);
      console.log("snapshot", snapshot);
      setRows(checkQuery);
    } else if (aa == "3") {
      console.log("3");
      const queryRef = query(
        collection(db, "Employee"),
        where("type", "==", "employee"),
        where("dept", "==", "It"),
        where("city", "==", "surat")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("check", checkQuery);
      setRows(checkQuery);
      // setaa(checkQuery);
      // return checkQuery;
    } else if (aa == "4") {
      console.log("4");
      const queryRef = query(
        collection(db, "Employee"),
        where("type", "==", "employee"),
        // where("dept", "==", "It"),
        orderBy("city", "", "A")
        // startAt("A" || "a")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(snapshot.docs);
      setRows(checkQuery);
    } else if (aa == "5") {
      console.log("5");
      const queryRef = query(
        collection(db, "Employee"),
        where("type", "==", "employee"),
        where("dept", "==", "Sales")
        // orderBy("fname", "==", "desc")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(checkQuery);
      setRows(checkQuery);
      // setQuerys(checkQuery);
      return snapshot.docs;
    }
  };

  const handleData = async () => {
    try {
      const booking = query(
        collection(db, "Employee"),
        where("type", "==", "employee")
      );
      const snapshot = await getDocs(booking);
      const rows = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(rows);
    } catch (err) {
      console.log(err);
    }
    return rows;
  };
  useEffect(() => {
    handleData();
  }, []);
  return (
    <div>
      <Container component="main" maxWidth="md">
        <div>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => handleQuery(e)}
            value={querys}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="HR departments with Max salary"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="IT departments with Min salary"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label=" IT departments and location is Surat city"
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label=" IT departments and location name is starting from A"
            />
            <FormControlLabel
              value="5"
              control={<Radio />}
              label=" Sales departments and descending order of employee name"
            />
          </RadioGroup>
        </div>

        <br />
        <TableContainer component={Paper}>
          <Table sx={{ Width: "400px" }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ background: "black" }}>
                <TableCell style={{ color: "white " }}>FirstName</TableCell>
                <TableCell style={{ color: "white " }}>LastName</TableCell>
                <TableCell style={{ color: "white " }}>Gmail</TableCell>
                <TableCell style={{ color: "white " }}>Gender</TableCell>
                <TableCell style={{ color: "white " }}>Hobbies</TableCell>
                <TableCell style={{ color: "white " }}>City</TableCell>
                <TableCell style={{ color: "white " }}>Salary</TableCell>
                <TableCell style={{ color: "white " }}>Department</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell>{row.fname}</StyledTableCell>
                  <StyledTableCell>{row.lname}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.gender}</StyledTableCell>
                  <StyledTableCell>{row.hobbies}</StyledTableCell>
                  <StyledTableCell>{row.city}</StyledTableCell>
                  <StyledTableCell>{row.salary}</StyledTableCell>
                  <DropDown data={row} />
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <br />
      <Button type="submit" variant="outlined" onClick={logOut}>
        Logout
      </Button>
      <br />
    </div>
  );
}

export default Manager;
