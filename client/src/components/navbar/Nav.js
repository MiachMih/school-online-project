import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

function Icon(props) {
  const { icon: Display } = props;
  return <Display className={`${styles.icon} ${styles.nested}`} />;
}

export function Li(props) {
  const { to, icon, onClick } = props;
  if (!icon) {
    return (
      <li>
        <Link to={to} className={styles.btn} onClick={onClick}>
          {props.children}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link to={to} className={styles.btn} onClick={onClick}>
        <Icon icon={icon} />
        <span>{props.children}</span>
      </Link>
    </li>
  );
}

export function Ul(props) {
  const { icon, text } = props;
  return (
    <li>
      <button className={`${styles.btn} ${styles.nested}`}>
        <Icon icon={icon} />
        <span>{text}</span>
      </button>
      <ul className={styles.flyout}>{props.children}</ul>
    </li>
  );
}

export function Sidebar(props) {
  const { header } = props;
  return (
    <div className={styles.sidebar}>
      <header>{header}</header>

      <ul className={styles.navigation}>{props.children}</ul>
    </div>
  );
}

export function Content(props) {
  return <div className={styles.content}>{props.children}</div>;
}

function Nav(props) {
  return <div className={styles.container}>{props.children}</div>;
}

export default Nav;
