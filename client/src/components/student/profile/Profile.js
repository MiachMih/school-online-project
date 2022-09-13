import React, { useState } from "react";
import View from "./View";
import Edit from "./Edit";
import styles from "./Profile.module.css";
import { useDispatch } from "react-redux";
import { updateStudent } from "../../../store/student-slice";

function Profile(props) {
  const dispatch = useDispatch();
  const { student } = props;
  const [viewEditSwitch, setViewEditSwitch] = useState(true);
  const [edit, setEdit] = useState({ ...student });
  function editHandler(e) {
    return setEdit({ ...edit, [e.target.name]: e.target.value });
  }

  function toggleHandler() {
    setViewEditSwitch(() => !viewEditSwitch);
    setEdit({ ...student });
  }

  function saveHandler() {
    dispatch(updateStudent(edit));
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles["card-body"]}>
          <div className={styles["info-field"]}>
            <div className={styles.label}>
              <span>ID</span>
            </div>
            <div className={styles.info}>
              <span>{student._id}</span>
            </div>
          </div>
          {viewEditSwitch ? (
            <View styles={styles} student={student} />
          ) : (
            <Edit editHandler={editHandler} styles={styles} edit={edit} />
          )}

          <div className={styles["info-field"]}>
            <div className={styles.label}>
              <span>GPA</span>
            </div>
            <div className={styles.info}>
              <span>{student.GPA}</span>
            </div>
          </div>

          <div className={styles["info-field"]}>
            <div className={styles.label}>
              <span>Class Grade</span>
            </div>
            <div className={styles.info}>
              <span>{student.class_grade}</span>
            </div>
          </div>

          <div className={styles["info-field"]}>
            <div className={styles.label}>
              <span>Honors Classes Taken</span>
            </div>
            <div className={styles.info}>
              <span>{student.honors_classes_taken}</span>
            </div>
          </div>
          <div className={styles["info-field"]}>
            <button className={styles.btn} onClick={toggleHandler}>
              Edit
            </button>

            {!viewEditSwitch && (
              <button className={styles.btn} onClick={saveHandler}>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
