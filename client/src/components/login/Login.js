import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import styled from "styled-components";
import bg from "../../assets/galaxy-night-view.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStudent, validate } from "../../store/student-slice";

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
  const isLoading = useSelector((state) => state.student.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validate(navigate));
  }, [dispatch, navigate]);

  function submitHandler(e) {
    e.preventDefault();
    dispatch(loginStudent(loginData, navigate));
  }

  function changeHandler(e) {
    return setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  if (isLoading) {
    return <>...Loading</>;
  }

  return (
    <Container bg={bg}>
      <div id="hi" className={styles.content}>
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
            <a href="#hi" className={styles.link}>
              Forgot password
            </a>
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
