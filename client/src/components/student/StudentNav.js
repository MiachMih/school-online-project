import React from "react";
import Nav, { Li, Ul, Sidebar, Content } from "../navbar/Nav";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { MdOutlineAnnouncement } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoIosBook } from "react-icons/io";

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
        <Ul text="Manage Classes" icon={IoIosBook}>
          <Li to="/student/registered">Registered Next Year</Li>
          <Li to="/student/schedule">Schedule</Li>
          <Li to="/student/add-classes">Add Classes</Li>
          <Li to="/student/drop-classes">Drop Classes</Li>
          <Li to="/student/history">My History</Li>
        </Ul>
        <Li to="/student/billing" icon={FaMoneyBillWave}>
          Billing
        </Li>
        <Li to="/student/announcement" icon={MdOutlineAnnouncement}>
          Announcement
        </Li>
        <Li onClick={logoutHandler} to="/login" icon={ImExit}>
          Logout
        </Li>
      </Sidebar>
      <Content>{props.children}</Content>
    </Nav>
  );
}

export default StudentNav;
