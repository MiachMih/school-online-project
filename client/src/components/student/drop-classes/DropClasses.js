import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRegisteringClasses } from "../../../store/student-slice";
import Form, { Dropdown } from "../../form/Form";

function DropClasses() {
  const dispatch = useDispatch();
  const registering_classes = useSelector(
    (state) => state.user.userInfo.registering_next_year_classes
  );
  const options = registering_classes.map((item) => {
    return {
      key: item.class_id,
      text: item.subject_name,
      value: item.class_id,
    };
  });
  const regRef = useRef();

  async function saveHandler(e) {
    e.preventDefault();
    dispatch(
      updateRegisteringClasses({
        remove_classes_id: regRef.current.state.value,
      })
    );
  }

  return (
    <Form btnName="Remove" onSubmit={saveHandler}>
      <Dropdown ref={regRef} options={options}>
        Remove Class From Cart
      </Dropdown>
    </Form>
  );
}

export default DropClasses;
