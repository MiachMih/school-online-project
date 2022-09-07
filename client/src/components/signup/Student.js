import React, { useState } from "react";
import styles from "./Student.module.css";
import { signUpStudent } from "../../store/student-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Student() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ class_grade: 9 });

  async function submitHandler(e) {
    e.preventDefault();
    dispatch(signUpStudent(form, navigate));
  }

  function changeHandler(e) {
    return setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={submitHandler} className={styles.form}>
          <h1 className={styles.title}>Student</h1>
          <div className={styles.inputs}>
            <label>Name</label>
            <input type="text" name="name" onChange={changeHandler}></input>
          </div>
          <div className={styles.inputs}>
            <label>Email</label>
            <input type="email" name="email" onChange={changeHandler}></input>
          </div>
          <div className={styles.inputs}>
            <label>Age</label>
            <input type="number" name="age" onChange={changeHandler}></input>
          </div>
          <div className={styles.inputs}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={changeHandler}
            ></input>
          </div>
          <div className={styles.inputs}>
            <label>Class Grade</label>
            <select name="class_grade" onChange={changeHandler}>
              <option value="9">Freshman</option>
              <option value="10">Sophomore</option>
              <option value="11">Junior</option>
              <option value="12">Senior</option>
            </select>
          </div>
          <div className={styles.inputs}>
            <label>Address</label>
            <input type="text" name="address" onChange={changeHandler}></input>
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Student;
