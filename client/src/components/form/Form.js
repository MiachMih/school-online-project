import React from "react";
import styles from "./Form.module.css";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import FileBase from "react-file-base64";

export function Title(props) {
  return <h1 className={styles.title}>{props.children}</h1>;
}

export const Input = React.forwardRef((props, ref) => {
  const { name, type, value } = props;
  return (
    <div className={`${styles.inputs}`}>
      <label htmlFor={name}>{props.children}</label>
      <input
        ref={ref}
        type={type}
        name={name}
        onChange={props.onChange}
        value={value}
      />
    </div>
  );
});

export const File = (props) => {
  const { name } = props;
  return (
    <div className={`${styles.inputs}`}>
      <label htmlFor={name}>{props.children}</label>
      <FileBase
        multiple={false}
        onDone={({ base64 }) => {
          props.setImg(base64);
        }}
      />
    </div>
  );
};

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

export const Dropdown = React.forwardRef((props, ref) => {
  const { name } = props;
  return (
    <div className={styles.inputs}>
      <label htmlFor={name}>{props.children}</label>
      <SemanticDropdown
        ref={ref}
        placeholder="None"
        additionPosition="bottom"
        onChange={props.onChange}
        fluid
        multiple
        search
        selection
        options={props.options}
      />
    </div>
  );
});

export const DynamicDropdown = React.forwardRef((props, ref) => {
  const { name, value = [] } = props;
  return (
    <div className={styles.inputs}>
      <label htmlFor={name}>{props.children}</label>
      <SemanticDropdown
        ref={ref}
        placeholder="None"
        additionPosition="bottom"
        onChange={props.onChange}
        fluid
        multiple
        search
        value={value}
        selection
        options={props.options}
      />
    </div>
  );
});

export const DynamicSingleDropdown = React.forwardRef((props, ref) => {
  const { name, value = "" } = props;
  return (
    <div className={styles.inputs}>
      <label htmlFor={name}>{props.children}</label>
      <SemanticDropdown
        ref={ref}
        placeholder="None"
        additionPosition="bottom"
        onChange={props.onChange}
        search
        selection
        value={value}
        options={props.options}
      />
    </div>
  );
});

export const SingleDropdown = React.forwardRef((props, ref) => {
  const { name } = props;
  return (
    <div className={styles.inputs}>
      <label htmlFor={name}>{props.children}</label>
      <SemanticDropdown
        ref={ref}
        placeholder="None"
        additionPosition="bottom"
        onChange={props.onChange}
        search
        selection
        options={props.options}
      />
    </div>
  );
});

export function Number(props) {
  const { name } = props;
  return (
    <div className={`${styles.inputs}`}>
      <label htmlFor={name}>{props.children}</label>
      <input type="number" name={name} onChange={props.onChange} />
    </div>
  );
}

export function Checkbox(props) {
  const { name } = props;
  return (
    <div className={styles.inputs}>
      <label htmlFor={name}>{props.children}</label>
      <input type="checkbox" name={name} onChange={props.onChange} />
    </div>
  );
}

export function Schedule(props) {
  return <div className={styles.schedule}>{props.children}</div>;
}

export function Text(props) {
  const { name, value } = props;
  return (
    <div className={`${styles.inputs}`}>
      <label htmlFor={name}>{props.children}</label>
      <input type="text" name={name} onChange={props.onChange} value={value} />
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

export function Container(props) {
  return <div className={styles.container}>{props.children}</div>;
}

export function Button(props) {
  return (
    <button className={styles.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

const Form = React.forwardRef((props, ref) => {
  const { btnName } = props;
  return (
    <form ref={ref} onSubmit={props.onSubmit} className={styles.form}>
      {props.children}
      <button className={styles.btn} type="submit">
        {btnName}
      </button>
    </form>
  );
});

export default Form;
