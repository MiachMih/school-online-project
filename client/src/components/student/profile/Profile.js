import React, { useState } from "react";
import styles from "./Profile.module.css";
import { useDispatch } from "react-redux";
import { updateStudent } from "../../../store/student-slice";
import Card, { Editable, View } from "../../form/Profile";

function Profile(props) {
  const dispatch = useDispatch();
  const { student } = props;
  const [viewEditSwitch, setViewEditSwitch] = useState(true);
  const [edit, setEdit] = useState({ ...student });
  function editHandler(e) {
    return setEdit({ ...edit, [e.target.name]: e.target.value });
  }

  function toggleHandler() {
    setViewEditSwitch(() => !viewEditSwitch);
    setEdit({ ...student });
  }

  function saveHandler() {
    dispatch(updateStudent(edit));
  }

  return (
    <div className={styles.container}>
      <Card
        onClick={toggleHandler}
        onSave={saveHandler}
        viewEditSwitch={viewEditSwitch}
      >
        <View label="ID">{student._id}</View>
        <Editable
          viewEditSwitch={viewEditSwitch}
          label="Name"
          name="name"
          type="text"
          edit={edit}
          onChange={editHandler}
        />
        <Editable
          viewEditSwitch={viewEditSwitch}
          label="Age"
          name="age"
          type="number"
          edit={edit}
          onChange={editHandler}
        />

        <Editable
          viewEditSwitch={viewEditSwitch}
          label="Email"
          name="email"
          type="email"
          edit={edit}
          onChange={editHandler}
        />

        <Editable
          viewEditSwitch={viewEditSwitch}
          label="Password"
          name="password"
          type="text"
          edit={edit}
          onChange={editHandler}
        />

        <Editable
          viewEditSwitch={viewEditSwitch}
          label="Address"
          name="address"
          type="text"
          edit={edit}
          onChange={editHandler}
        />

        <View label="GPA">{student.GPA}</View>
        <View label="Class Grade">{student.class_grade}</View>
        <View label="Honors Classes Taken">{student.honors_classes_taken}</View>
      </Card>
    </div>
  );
}

export default Profile;
