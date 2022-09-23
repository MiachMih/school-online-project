import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchTeacher } from "../../store/teacher-slice";
import { Routes, Route, useNavigate } from "react-router-dom";

import Profile from "./profile/Profile";
import CreateClass from "./create-class/CreateClass";
import EditClass from "./edit-classes/Edit";
import Nav from "./TeacherNav";

function Teacher() {
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teacher.userInfo);
  const isNew = useSelector((state) => state.teacher.isNew);
  const isLoading = useSelector((state) => state.teacher.loading);
  const navigate = useNavigate();

  useEffect(() => {
    if (isNew) {
      dispatch(fetchTeacher(navigate));
    }
  }, [dispatch, isNew, teacher, navigate]);
  return (
    <>
      <Nav>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Profile teacher={teacher} />} />
            <Route path="/profile" element={<Profile teacher={teacher} />} />
            <Route path="/edit-classes" element={<EditClass />} />
            <Route path="/create-class" element={<CreateClass />} />
          </Routes>
        )}
      </Nav>
    </>
  );
}

export default Teacher;
