import React from "react";
import styles from "./DisplayClass.module.css";
import { useDispatch } from "react-redux";
import { enrollStudentToClass } from "../../../store/student-slice";

function DisplayClass(props) {
  const { result } = props;
  const dispatch = useDispatch();

  function clickHandler(e) {
    dispatch(
      enrollStudentToClass({
        id: result._id,
      })
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.content}>
        <li>
          <h3>Class Name</h3>
          <h4>{result.class_name}</h4>
        </li>
        <li>
          <h3>Teacher Name</h3>
          <h4>{result.teacher_name}</h4>
        </li>
        <li>
          <h3>Class Prerequisites</h3>
          <h4>
            {result.class_prerequisites.map((item) => {
              return (
                <React.Fragment key={item.class_id}>
                  {item.prerequisite_class_name}
                  {", "}
                </React.Fragment>
              );
            })}
            {result.class_prerequisites.length === 0 && <>None</>}
          </h4>
        </li>
        <li>
          <h3>Class Description</h3>
          <h4>{result.class_description}</h4>
        </li>
        <li>
          <h3>Subject</h3>
          <h4>{result.subject}</h4>
        </li>
      </ul>
      <p className={styles["card__apply"]}>
        <button onClick={clickHandler} className={styles["card_btn"]} href="#">
          Apply Now
        </button>
      </p>
    </div>
  );
}

export default DisplayClass;
