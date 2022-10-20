import React from "react";
import styles from "./Display.module.css";

function Display({ subject_name, teacher_name, letter_grade }) {
  return (
    <div className={styles.container}>
      <ul className={styles.content}>
        <li>
          <h3>Subject Name:</h3>
          <h3>{subject_name}</h3>
        </li>
        <li>
          <h3>Teacher Name:</h3>
          <h3>{teacher_name}</h3>
        </li>
        <li>
          <h3>Letter Grade:</h3>
          <h3>{letter_grade}</h3>
        </li>
      </ul>
    </div>
  );
}

export default Display;
