import React from "react";
import styles from "./Display.module.css";

function Display({ subject_name, teacher_name }) {
  return (
    <div className={styles.container}>
      <ul className={styles.content}>
        <li>
          <h3>Subject Name:</h3>
          <h4>{subject_name}</h4>
        </li>
        <li>
          <h3>Teacher Name:</h3>
          <h4>{teacher_name}</h4>
        </li>
      </ul>
    </div>
  );
}

export default Display;
