import React from "react";
import { useDispatch } from "react-redux";

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
    <div>
      <button onClick={clickHandler}>
        {isYearInProgress && <>End Year</>}
        {!isYearInProgress && <>Start Year</>}
      </button>
    </div>
  );
}

export default ToggleYear;
