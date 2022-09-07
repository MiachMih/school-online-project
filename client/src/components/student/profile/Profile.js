import React from "react";

function Profile(props) {
  const { student } = props;
  return (
    <div>
      {student._id}
      {student.name}
    </div>
  );
}

export default Profile;
