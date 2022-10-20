import React, { useState } from "react";
import { addSubject } from "../../../store/classes-slice";
import { useDispatch } from "react-redux";
import Form, { Text } from "../../form/Form";
import { Container } from "../../form/Form";

function AddSubject() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    dispatch(addSubject({ name }));
    setName("");
  }

  function changeHandler(e) {
    setName(e.target.value);
  }

  return (
    <Container>
      <Form btnName="Submit" onSubmit={submitHandler}>
        <Text name="name" onChange={changeHandler} value={name}>
          Subject Name
        </Text>
      </Form>
    </Container>
  );
}

export default AddSubject;
