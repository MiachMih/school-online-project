import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Student from "./components/student/Student";
import Login from "./components/login/Login";
import Signup from "./components/signup/General";

function App() {
  //TODO: change the redux provider from index.js to here
  // and make sure students teachers and classes serve
  // the routes that they are supposed to serve
  return (
    <Fragment>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/*" element={<Signup />} />
        <Route path="/student/*" element={<Student />} />
      </Routes>
    </Fragment>
  );
}

export default App;
