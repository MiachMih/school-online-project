import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Student from "./components/student/Student";
import Login from "./components/login/Login";
import Signup from "./components/signup/General";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route exact path="/" element={<Student />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Fragment>
  );
}

export default App;
