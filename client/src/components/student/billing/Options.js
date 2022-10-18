import React from "react";
import styles from "./Options.module.css";

function Options(props) {
  const { currentFocus } = props;
  const options = [1, 2, 5, 10, 20];
  return (
    <div className={styles.container}>
      {options.map((option, index) => {
        const style =
          currentFocus === option
            ? `${styles.btn} ${styles.focus}`
            : styles.btn;
        return (
          <button
            key={index}
            className={style}
            onClick={() => {
              props.setAmount(option);
            }}
          >
            ${option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
