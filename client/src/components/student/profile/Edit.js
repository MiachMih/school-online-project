import React from "react";

function Edit(props) {
  const { edit, styles, editHandler } = props;

  return (
    <>
      <div className={styles["info-field"]}>
        <div className={styles.label}>
          <span>Name</span>
        </div>
        <div className={styles.edit}>
          <input
            type="text"
            name="name"
            onChange={editHandler}
            value={edit.name}
          />
        </div>
      </div> */}

      {/* <div className={styles["info-field"]}>
        <div className={styles.label}>
          <span>Age</span>
        </div>
        <div className={styles.edit}>
          <input
            type="number"
            name="age"
            onChange={editHandler}
            value={edit.age}
          />
        </div>
      </div>

      <div className={styles["info-field"]}>
        <div className={styles.label}>
          <span>Email</span>
        </div>
        <div className={styles.edit}>
          <input
            type="email"
            name="email"
            onChange={editHandler}
            value={edit.email}
          />
        </div>
      </div>

      <div className={styles["info-field"]}>
        <div className={styles.label}>
          <span>Password</span>
        </div>
        <div className={styles.edit}>
          <input
            type="text"
            name="password"
            onChange={editHandler}
            value={edit.password}
          />
        </div>
      </div>

      <div className={styles["info-field"]}>
        <div className={styles.label}>
          <span>Address</span>
        </div>
        <div className={styles.edit}>
          <input
            type="text"
            name="address"
            onChange={editHandler}
            value={edit.address}
          />
        </div>
      </div>
    </>
  );
}

export default Edit;
