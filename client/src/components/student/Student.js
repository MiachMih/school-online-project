import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchStudent } from "../../store/student-slice";
import { Routes, Route, useNavigate } from "react-router-dom";

import History from "./history/History";
import Profile from "./profile/Profile";
import Billing from "./billing/Billing";
import Announcement from "./announcement/Announcement";
import Schedule from "./schedule/Schedule";
import AddClasses from "./add-classes/AddClasses";
import DropClasses from "./drop-classes/DropClasses";
import Nav from "./StudentNav";
import RegisteredClasses from "./registered_next_year/RegisteredClasses";

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
            <Route
              path="/history"
              element={
                <History previous_classes={student.previous_subjects_taken} />
              }
            />
            <Route path="/billing" element={<Billing />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route
              path="/schedule"
              element={<Schedule current_classes={student.current_classes} />}
            />
            <Route
              path="/registered"
              element={
                <RegisteredClasses
                  registered_classes={student.registering_next_year_classes}
                />
              }
            />
            <Route path="/add-classes/*" element={<AddClasses />} />
            <Route path="/drop-classes" element={<DropClasses />} />
            <Route path="*" element={<Profile student={student} />} />
          </Routes>
        )}
      </Nav>
    </>
  );
}

export default Student;
