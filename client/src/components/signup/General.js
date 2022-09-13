import React, { useEffect } from "react";
import Student from "./Student";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../store/student-slice";

function General() {
  const isLoading = useSelector((state) => state.student.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validate(navigate));
  }, [dispatch, navigate]);

  if (isLoading) {
    return <>...Loading</>;
  }

  return (
    <div>
      <Student />
    </div>
  );
}

export default General;
