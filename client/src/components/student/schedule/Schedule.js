import React from "react";
import { Container } from "../../form/Form";
import Display from "./Display";

function Schedule(props) {
  const { current_classes } = props;
  const display = current_classes.map((item) => {
    return {
      id: item.class_id,
      subject_name: item.subject_name,
      teacher_name: item.teacher_name,
      letter_grade: item.letter_grade,
    };
  });

  if (display.length === 0) {
    return <Container>No Current Classes</Container>;
  }

  return (
    <Container>
      {display.map((item, index) => {
        return (
          <Display
            key={index}
            subject_name={item.subject_name}
            teacher_name={item.teacher_name}
            letter_grade={item.letter_grade}
          />
        );
      })}
    </Container>
  );
}

export default Schedule;
