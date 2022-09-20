import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../store/student-slice";
import styles from "./General.module.css";
import Student from "./Student";
import Teacher from "./Teacher";

function General() {
  // TODO: change the validate to check both teachers and students

  const isLoading = useSelector((state) => state.student.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validate(navigate));
  }, [dispatch]);

  if (isLoading) {
    return <>...Loading</>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <Link to="/login">Login</Link>
        <Link to="/signup/student">Student</Link>
        <Link to="/signup/teacher">Teacher</Link>
      </div>
      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </div>
  );
}

export default General;
