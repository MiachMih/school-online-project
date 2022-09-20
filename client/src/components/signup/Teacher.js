import React, { useState } from "react";
import styles from "./Student.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form, { Title, Text, Email, Number, Password } from "../form/Form";

function Teacher() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  async function submitHandler(e) {
    e.preventDefault();
  }

  function changeHandler(e) {
    return setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className={styles.content}>
      <Form onSubmit={submitHandler} btnName="Signup">
        <Title>Teacher</Title>
        <Text name="name" onChange={changeHandler}>
          Name
        </Text>
        <Email name="email" onChange={changeHandler}>
          Email
        </Email>
        <Number name="age" onChange={changeHandler}>
          Age
        </Number>
        <Password name="password" onChange={changeHandler}>
          Password
        </Password>
        <Text name="address" onChange={changeHandler}>
          Address
        </Text>
      </Form>
    </div>
  );
}

export default Teacher;
