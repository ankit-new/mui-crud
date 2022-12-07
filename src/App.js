import Login from "./components/Login";
import "./App.css";
import SignUp from "./components/SignUp";
import { useState } from "react";
import Manager from "./manager/Manager";
import Employee from "./manager/Employee";
import { Route, Routes } from "react-router-dom";

function App() {
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            toggleForm ? (
              <Login toggle={() => formMode()} />
            ) : (
              <SignUp toggle={() => formMode()} />
            )
          }
        />
        <Route path="/manager" element={<Manager />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
    </div>
  );
}

export default App;
