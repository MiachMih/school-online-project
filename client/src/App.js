import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Student from "./components/student/Student";
import Login from "./components/login/Login";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Fragment>
  );
}

export default App;
