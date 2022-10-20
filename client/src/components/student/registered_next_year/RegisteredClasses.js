import React from "react";
import { Container } from "../../form/Form";
import Display from "./Display";

function RegisteredClasses(props) {
  const { registered_classes } = props;
  const display = registered_classes.map((item) => {
    return {
      id: item.class_id,
      subject_name: item.subject_name,
      teacher_name: item.teacher_name,
    };
  });

  if (display.length === 0) {
    return <Container>No Classes Registered for Next Year</Container>;
  }

  return (
    <Container>
      {display.map((item) => {
        return (
          <Display
            key={item.id}
            subject_name={item.subject_name}
            teacher_name={item.teacher_name}
          />
        );
      })}
    </Container>
  );
}

export default RegisteredClasses;
