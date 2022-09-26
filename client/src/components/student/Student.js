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
import Nav from "./StudentNav";

function Student() {
  /*TODO: fix styling in Nav.module.css 

    Add modal for small screens in Nav
    add loading screen
    return dynamic responses to the input fields on update of profile
  */

  const dispatch = useDispatch();
  const student = useSelector((state) => state.user.userInfo);
  const isNew = useSelector((state) => state.user.isNew);
  const isLoading = useSelector((state) => state.user.loading);
  const navigate = useNavigate();

  useEffect(() => {
    if (isNew) {
      dispatch(fetchStudent(navigate));
    }
  }, [dispatch, isNew, student, navigate]);

  return (
    <>
      <Nav>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Profile student={student} />} />
            <Route path="/profile" element={<Profile student={student} />} />
            <Route path="/history" element={<History />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/edit-classes" element={<EditClasses />} />
          </Routes>
        )}
      </Nav>
    </>
  );
}

export default Student;
