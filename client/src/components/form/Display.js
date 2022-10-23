import React, { useId } from "react";
import { Item } from "semantic-ui-react";
import styles from "./Display.module.css";

function Helper({ display }) {
  let content = [];
  const key = useId;
  for (const item in display) {
    content.push(
      <li key={key()}>
        <h3>{item}</h3>
        <h4>{display[item]}</h4>
      </li>
    );
  }
  return <>{content}</>;
}

function Display({ display_list }) {
  return (
    <>
      {display_list.map((item, index) => {
        return (
          <div key={index} className={styles.container}>
            <ul className={styles.content}>
              <Helper display={item} />
            </ul>
          </div>
        );
      })}
    </>
  );
}

export default Display;
