import React, { useState } from "react";
import styles from "./Student.module.css";
import { signUpStudent } from "../../store/student-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form, {
  Title,
  Text,
  Email,
  Number,
  Password,
  Select,
  Option,
} from "../form/Form";

function Student() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ class_grade: 9 });

  async function submitHandler(e) {
    e.preventDefault();
    dispatch(signUpStudent(form, navigate));
  }

  function changeHandler(e) {
    return setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className={styles.content}>
      <Form onSubmit={submitHandler} btnName="Signup">
        <Title>Student</Title>
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
        <Select name="class_grade" label="Class Grade" onChange={changeHandler}>
          <Option value="9">Freshman</Option>
          <Option value="10">Sophomore</Option>
          <Option value="11">Junior</Option>
          <Option value="12">Senior</Option>
        </Select>

        <Text name="address" onChange={changeHandler}>
          Address
        </Text>
      </Form>
    </div>
  );
}

export default Student;
