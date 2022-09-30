import React from "react";
import styles from "./Profile.module.css";

export function View(props) {
  const { label } = props;
  return (
    <div className={styles["info-field"]}>
      <div className={styles.label}>
        <span>{label}</span>
      </div>
      <div className={styles.info}>
        <span>{props.children}</span>
      </div>
    </div>
  );
}

export function Edit(props) {
  const { label, value, name, type } = props;
  return (
    <div className={styles["info-field"]}>
      <div className={styles.label}>
        <span>{label}</span>
      </div>
      <div className={styles.edit}>
        <input
          type={type}
          name={name}
          onChange={props.onChange}
          value={value}
        />
      </div>
    </div>
  );
}

export function Editable(props) {
  const { viewEditSwitch, label, name, type, edit } = props;
  return (
    <>
      {viewEditSwitch ? (
        <View label={label}>{edit[name]}</View>
      ) : (
        <Edit
          label={label}
          name={name}
          type={type}
          value={edit[name]}
          onChange={props.onChange}
        />
      )}
    </>
  );
}

function Card(props) {
  const { viewEditSwitch } = props;
  return (
    <div className={`${styles.card} ${styles["card-body"]}`}>
      {props.children}
      <div className={styles["info-field"]}>
        <button className={styles.btn} onClick={props.onClick}>
          Edit
        </button>
        {!viewEditSwitch && (
          <button className={styles.btn} onClick={props.onSave}>
            Save
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
