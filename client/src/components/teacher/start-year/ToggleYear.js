import React from "react";
import { useDispatch } from "react-redux";
import { Container, Button } from "../../form/Form";

function ToggleYear(props) {
  const { isYearInProgress } = props;
  const dispatch = useDispatch();

  async function clickHandler() {
    try {
      const response = await dispatch(props.toggle());
      props.setIsYearInProgress(response);
    } catch (error) {}
  }
  return (
    <Container>
      <Button onClick={clickHandler}>
        {isYearInProgress && <>End Year</>}
        {!isYearInProgress && <>Start Year</>}
      </Button>
    </Container>
  );
}

export default ToggleYear;
