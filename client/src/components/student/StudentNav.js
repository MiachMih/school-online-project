import React from "react";
import Nav, { Li, Ul, Sidebar, Content } from "../navbar/Nav";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { CgProfile } from "react-icons/cg";

function StudentNav(props) {
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(userActions.logout());
  }

  return (
    <Nav>
      <Sidebar header="Menu">
        <Li to="/student/profile" icon={CgProfile}>
          Profile
        </Li>
        <Ul text="Manage Classes" icon={CgProfile}>
          <Li to="/student/schedule">Schedule</Li>
          <Li to="/student/edit-classes">Add/Drop Classes</Li>
          <Li to="/student/history">My History</Li>
        </Ul>
        <Li to="/student/billing" icon={CgProfile}>
          Billing
        </Li>
        <Li to="/student/announcement" icon={CgProfile}>
          Announcement
        </Li>
        <Li onClick={logoutHandler} to="/login" icon={CgProfile}>
          Logout
        </Li>
      </Sidebar>
      <Content>{props.children}</Content>
    </Nav>
  );
}

export default StudentNav;
