import React from "react";
import styles from "./Profile.module.css";
import { updateStudent } from "../../../store/student-slice";
import Card from "../../form/Profile";

function Profile(props) {
  const { student } = props;

  const view_list = [
    { label: "ID", name: "_id" },
    { label: "GPA", name: "GPA" },
    { label: "Class Grade", name: "class_grade" },
  ];

  const editable_list = [
    { label: "Name", name: "name", type: "text" },
    { label: "Age", name: "age", type: "number" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "text" },
    { label: "Address", name: "address", type: "text" },
  ];

  return (
    <div className={styles.container}>
      <Card
        profile_data={student}
        view_list={view_list}
        editable_list={editable_list}
        saveHandler={updateStudent}
      />
    </div>
  );
}

export default Profile;
