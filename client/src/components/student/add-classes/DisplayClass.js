import React from "react";
import styles from "./DisplayClass.module.css";
import { useDispatch } from "react-redux";
import { enrollStudentToClass } from "../../../store/classes-slice";

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
    <div className={styles.cards}>
      <div className={`${styles["card-1"]} ${styles.card}`}>
        <ul>
          <li>{result.class_name}</li>
          <li>{result.teacher_name}</li>
          <li>
            {result.class_prerequisites.map((item) => {
              return <p key={item.class_id}>{item.prerequisite_class_name}</p>;
            })}
          </li>
          <li>{result.class_description}</li>
          <li>{result.subject}</li>
        </ul>
        <p className={styles["card__apply"]}>
          <button
            onClick={clickHandler}
            className={styles["card_btn"]}
            href="#"
          >
            Apply Now
          </button>
        </p>
      </div>
    </div>
  );
}

export default DisplayClass;
