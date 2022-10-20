import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getIsYearInProgress,
  toggleYearInProgress,
} from "../../../store/classes-slice";
import ToggleYear from "./ToggleYear";

function Year() {
  const dispatch = useDispatch();
  const [isYearInProgress, setIsYearInProgress] = useState(null);

  useEffect(() => {
    async function fetchIsYearInProgress() {
      const response = await dispatch(getIsYearInProgress());
      setIsYearInProgress(response);
    }
    fetchIsYearInProgress();
  }, []);

  if (isYearInProgress === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToggleYear
        toggle={toggleYearInProgress}
        setIsYearInProgress={setIsYearInProgress}
        isYearInProgress={isYearInProgress}
      />
    </div>
  );
}

export default Year;
