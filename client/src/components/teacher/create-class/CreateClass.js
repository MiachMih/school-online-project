import React from "react";
import styles from "./CreateClass.module.css";
import Form, {
  Title,
  Text,
  Dropdown,
  Checkbox,
  Schedule,
} from "../../form/Form";

function CreateClass(props) {
  const prerequisitesRef = React.createRef();
  const DUMMY_OPTIONS = [
    { key: "bob", text: "Bob", value: "bob" },
    { key: "steve", text: "Steve", value: "steve" },
  ];

  function submitHandler(e) {
    e.preventDefault();
    console.log(prerequisitesRef.current.state.__value);
  }

  return (
    <div className={styles.container}>
      <Form onSubmit={submitHandler} btnName="create">
        <Title>Create Class</Title>
        <Text name="class_name">Class Name</Text>
        <Text name="teacher_name">Teacher Name</Text>
        <Text name="class_description">Class Description</Text>
        <Dropdown ref={prerequisitesRef} options={DUMMY_OPTIONS}>
          Prerequisites
        </Dropdown>
        <Schedule>
          <Checkbox name="Monday">Mo</Checkbox>
          <Checkbox name="Tuesday">Tu</Checkbox>
          <Checkbox name="Wednesday">We</Checkbox>
          <Checkbox name="Thursday">Th</Checkbox>
          <Checkbox name="Friday">Fr</Checkbox>
          <Checkbox name="Saturday">Sa</Checkbox>
          <Checkbox name="Sunday">Su</Checkbox>
        </Schedule>
      </Form>
    </div>
  );
}

export default CreateClass;
