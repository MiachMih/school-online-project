import React from "react";
import styles from "./DisplayInfo.module.css";

function DisplayInfo(props) {
  const { header, message, img } = props;
  return (
    <div className={styles.container}>
      <h1>{header}</h1>
      <p>{message}</p>
      <img src={img} alt={"something"} />
    </div>
  );
}

export default DisplayInfo;
