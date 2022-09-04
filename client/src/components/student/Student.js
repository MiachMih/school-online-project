import React from "react";
import styles from "./Student.module.css";

function Student() {
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.sidebar}>
          <li>
            <a>Profile</a>
          </li>
          {/*TODO: Put Schedule, Add/Drop Classes, My History
                 Into the Classes accordion */}
          <li>
            <a>Schedule</a>
          </li>
          <li>
            <a>Add/Drop Classes</a>
          </li>
          <li>
            <a>My History</a>
          </li>
          <li>
            <a>Billing</a>
          </li>
          <li>
            <a>Announcements</a>
          </li>
        </ul>

        <div className={styles.content}></div>
      </div>
    </>
  );
}

export default Student;
