import React from "react";
// import Display from "./Display";
import { Container } from "../../form/Form";
import Display from "../../form/Display";

function History(props) {
  const { previous_classes } = props;
  const display = previous_classes.map((item) => {
    return {
      "Subject Name": item.subject_name,
      "Teacher Name": item.teacher_name,
      "Letter Grade": item.letter_grade,
    };
  });

  if (display.length === 0) {
    return <Container>No Previous Classes</Container>;
  }

  return (
    <Container>
      <Display display_list={display} />
    </Container>
  );
}

export default History;
