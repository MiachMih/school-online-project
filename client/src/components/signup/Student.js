import React from "react";
import styles from "./Student.module.css";

function Student() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form}>
          <h1 className={styles.title}>Student</h1>
          <div className={styles.inputs}>
            <label>Name</label>
            <input type="text" name="name"></input>
          </div>
          <div className={styles.inputs}>
            <label>Email</label>
            <input type="email" name="email"></input>
          </div>
          <div className={styles.inputs}>
            <label>Age</label>
            <input type="number" name="age"></input>
          </div>
          <div className={styles.inputs}>
            <label>Password</label>
            <input type="password" name="password"></input>
          </div>
          <div className={styles.inputs}>
            <label>Class Grade</label>
            <select name="grade">
              <option value="9">Freshman</option>
              <option value="10">Sophomore</option>
              <option value="11">Junior</option>
              <option value="12">Senior</option>
            </select>
          </div>
          <div className={styles.inputs}>
            <label>Address</label>
            <input type="text" name="address"></input>
          </div>
          <button type="button">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Student;
