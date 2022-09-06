import React, { useEffect, useState } from "react";
import styles from "./Student.module.css";
import { fetchStudent, studentActions } from "../../store/student-slice";
import { useDispatch, useSelector } from "react-redux";

function Student() {
  const dispatch = useDispatch();
  const student = useSelector((state) => {
    return state.student.studentInfo;
  });
  const isLoading = useSelector((state) => state.student.loading);
  useEffect(() => {
    dispatch(fetchStudent());
  }, [dispatch]);

  console.log(student);
  console.log(isLoading);

  function logoutHandler() {
    dispatch(studentActions.logout());
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    // <>
    //   <div className={styles.container}>
    //     <ul className={styles.sidebar}>
    //       <li>
    //         <a>Profile</a>
    //       </li>
    //       {/*TODO: Put Schedule, Add/Drop Classes, My History
    //              Into the Classes accordion */}
    //       <li>
    //         <a>Schedule</a>
    //       </li>
    //       <li>
    //         <a>Add/Drop Classes</a>
    //       </li>
    //       <li>
    //         <a>My History</a>
    //       </li>
    //       <li>
    //         <a>Billing</a>
    //       </li>
    //       <li>
    //         <a>Announcements</a>
    //       </li>
    //     </ul>

    //     <div className={styles.content}></div>
    //   </div>
    // </>

    <div>
      <p>ID: {student._id}</p>
      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export default Student;
