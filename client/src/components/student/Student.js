import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchStudent } from "../../store/student-slice";
import { Routes, Route, useNavigate } from "react-router-dom";

import History from "./history/History";
import Profile from "./profile/Profile";
import Billing from "./billing/Billing";
import Announcement from "./announcement/Announcement";
import Schedule from "./schedule/Schedule";
import EditClasses from "./edit-classes/EditClasses";
import Nav from "./Nav";

function Student() {
  /*TODO: fix styling in Nav.module.css 

    Add modal for small screens in Nav
  */

  const dispatch = useDispatch();
  const student = useSelector((state) => state.student.studentInfo);
  const isLoading = useSelector((state) => state.student.loading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!student?._id) {
      dispatch(fetchStudent(navigate));
    }
  }, [dispatch, student, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Nav>
        <Routes>
          <Route path="/" element={<Profile student={student} />} />
          <Route path="/profile" element={<Profile student={student} />} />
          <Route path="/history" element={<History />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/edit-classes" element={<EditClasses />} />
        </Routes>
      </Nav>
    </>
  );
}

export default Student;
