import React from "react";
import styles from "./Form.module.css";

export function Title(props) {
  return <h1 className={styles.title}>{props.children}</h1>;
}

export function Password(props) {
  const { name } = props;
  return (
    <div className={`${styles.inputs}`}>
      <label htmlFor={name}>{props.children}</label>
      <input type="password" name={name} onChange={props.onChange} />
    </div>
  );
}

export function Select(props) {
  const { name, label } = props;
  return (
    <div className={styles.inputs}>
      <label htmlFor={name}>{label}</label>
      <select name={name} onChange={props.onChange} className={styles.select}>
        {props.children}
      </select>
    </div>
  );
}

export function Option(props) {
  const { value } = props;
  return <option value={value}>{props.children}</option>;
}

export function Number(props) {
  const { name } = props;
  return (
    <div className={`${styles.inputs}`}>
      <label htmlFor={name}>{props.children}</label>
      <input type="number" name={name} onChange={props.onChange} />
    </div>
  );
}

export function Text(props) {
  const { name } = props;
  return (
    <div className={`${styles.inputs}`}>
      <label htmlFor={name}>{props.children}</label>
      <input type="text" name={name} onChange={props.onChange} />
    </div>
  );
}

export function Email(props) {
  const { name } = props;
  return (
    <div className={styles.inputs}>
      <label htmlFor={name}>{props.children}</label>
      <input type="email" name={name} onChange={props.onChange} />
    </div>
  );
}

function Form(props) {
  const { btnName } = props;
  return (
    <form onSubmit={props.onSubmit} className={styles.form}>
      {props.children}
      <button className={styles.btn} type="submit">
        {btnName}
      </button>
    </form>
  );
}

export default Form;
