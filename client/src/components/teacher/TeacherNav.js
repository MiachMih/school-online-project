import React from "react";
import Nav, { Li, Sidebar, Content } from "../navbar/Nav";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { CgProfile } from "react-icons/cg";

function TeacherNav(props) {
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(userActions.logout());
  }
  return (
    <Nav>
      <Sidebar header="Menu">
        <Li to="/teacher/profile" icon={CgProfile}>
          Profile
        </Li>
        <Li to="/teacher/edit-classes" icon={CgProfile}>
          Edit Classes
        </Li>
        <Li to="/teacher/create-class" icon={CgProfile}>
          Create Class
        </Li>
        <Li to="/teacher/add-subject" icon={CgProfile}>
          Add Subject
        </Li>
        <Li onClick={logoutHandler} to="/login" icon={CgProfile}>
          Logout
        </Li>
      </Sidebar>
      <Content>{props.children}</Content>
    </Nav>
  );
}

export default TeacherNav;
