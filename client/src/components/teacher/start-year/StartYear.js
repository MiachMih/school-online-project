import React from "react";
import { useDispatch } from "react-redux";

function StartYear(props) {
  const dispatch = useDispatch();

  async function clickHandler() {
    const response = await dispatch(props.toggle());
    props.setIsYearInProgress(response);
  }

  return (
    <div>
      <button onClick={clickHandler}>Start Year</button>
    </div>
  );
}

export default StartYear;
