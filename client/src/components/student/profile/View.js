import React from "react";

function View(props) {
  const { student, styles } = props;
  return (
    <>
      <div className={styles["info-field"]}>
        <div className={styles.label}>
          <span>Name</span>
        </div>
        <div className={styles.info}>
          <span>{student.name}</span>
        </div>
      </div>

      <div className={styles["info-field"]}>
        <div className={styles.label}>
          <span>Age</span>
        </div>
        <div className={styles.info}>
          <span>{student.age}</span>
        </div>
      </div>

      <div className={styles["info-field"]}>
        <div className={styles.label}>
          <span>Email</span>
        </div>
        <div className={styles.info}>
          <span>{student.email}</span>
        </div>
      </div>

      <div className={styles["info-field"]}>
        <div className={styles.label}>
          <span>Password</span>
        </div>
        <div className={styles.info}>
          <span>{student.password}</span>
        </div>
      </div>

      <div className={styles["info-field"]}>
        <div className={styles.label}>
          <span>Address</span>
        </div>
        <div className={styles.info}>
          <span>{student.address}</span>
        </div>
      </div>
    </>
  );
}

export default View;
