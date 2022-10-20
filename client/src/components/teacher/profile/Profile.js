import React from "react";
import { updateTeacher } from "../../../store/teacher-slice";
import Card from "../../form/Profile";

const view_list = [{ label: "ID", name: "_id" }];

const editable_list = [
  { label: "Name", name: "name", type: "text" },
  { label: "Age", name: "age", type: "number" },
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "text" },
  { label: "Address", name: "address", type: "text" },
];

function Profile(props) {
  const { teacher } = props;
  return (
    <div>
      <Card
        profile_data={teacher}
        view_list={view_list}
        editable_list={editable_list}
        saveHandler={updateTeacher}
      />
    </div>
  );
}

export default Profile;
