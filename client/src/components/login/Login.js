import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import styled from "styled-components";
import bg from "../../assets/galaxy-night-view.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStudent, validate } from "../../store/student-slice";
import { loginTeacher } from "../../store/teacher-slice";
import Form, { Email, Password, Title } from "../form/Form";

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
  const [isStudentTeacher, setIsStudentTeacher] = useState(true);

  useEffect(() => {
    dispatch(validate(navigate));
  }, [dispatch, navigate]);

  function submitHandler(e) {
    e.preventDefault();
    if (isStudentTeacher) {
      dispatch(loginStudent(loginData, navigate));
    } else {
      dispatch(loginTeacher(loginData, navigate));
    }
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
        <button
          onClick={() => {
            setIsStudentTeacher((state) => !state);
          }}
        >
          Switch
        </button>
        {isStudentTeacher ? (
          <Title>Student Login</Title>
        ) : (
          <Title>Teacher Login</Title>
        )}
        <Form onSubmit={submitHandler} btnName="Login">
          <Email onChange={changeHandler} name="email">
            Email
          </Email>
          <Password onChange={changeHandler} name="password">
            Password
          </Password>

          <div className={styles.links}>
            <a href="#hi" className={styles.link}>
              Forgot password
            </a>
            <Link to="/signup" className={styles.link}>
              New User
            </Link>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
