import React, { useState } from "react";
import styles from "./Login.module.css";
import styled from "styled-components";
import bg from "../../assets/galaxy-night-view.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStudent } from "../../store/student-slice";

//TODO: fetch the background image from an API
// and render Loading screen while waiting for the picture
const Container = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Login() {
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(loginStudent(loginData));
  }

  function changeHandler(e) {
    return setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  return (
    <Container bg={bg}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome</h1>
        <form onSubmit={submitHandler} className={styles.form}>
          {/* TODO: validate email with an API
                    and display correct responses*/}
          <div className={styles.inputs}>
            <label htmlFor="email">Username</label>
            <input type="email" name="email" onChange={changeHandler} />
          </div>

          {/* TODO: validate password with an API
                    and display correct responses*/}
          <div className={`${styles.inputs}`}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={changeHandler} />
          </div>
          <button className={styles.btn}>Login</button>
          <div className={styles.links}>
            {/*TODO: add a link page to reset password */}
            <a className={styles.link}>Forgot password</a>
            <Link to="/signup" className={styles.link}>
              New User
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Login;
