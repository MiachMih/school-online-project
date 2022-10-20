import React from "react";
import Display from "./Display";
import { Container } from "../../form/Form";

function History(props) {
  const { previous_classes } = props;
  const display = previous_classes.map((item) => {
    return {
      id: item.class_id,
      subject_name: item.subject_name,
      teacher_name: item.teacher_name,
      letter_grade: item.letter_grade,
    };
  });

  if (display.length === 0) {
    return <Container>No Previous Classes</Container>;
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

export default History;
