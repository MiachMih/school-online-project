import React from "react";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome</h1>
        <form className={styles.form}>
          <div className={styles.inputs}>
            <label htmlFor="email">Username</label>
            <input type="email" name="email" />
          </div>
          <div className={`${styles.inputs}`}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>
          <button className={styles.btn}>Login</button>
          <div className={styles.links}>
            <a className={styles.link}>Forgot password</a>
            <a className={styles.link}>New User</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
