import React from "react";
import Nav, { Li, Sidebar, Content } from "../navbar/Nav";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { CgProfile } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { MdCreateNewFolder, MdOutlineAnnouncement } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { SiAddthis } from "react-icons/si";

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
        <Li to="/teacher/edit-classes" icon={AiFillEdit}>
          Edit Classes
        </Li>
        <Li to="/teacher/create-class" icon={MdCreateNewFolder}>
          Create Class
        </Li>
        <Li to="/teacher/add-subject" icon={SiAddthis}>
          Add Subject
        </Li>
        <Li to="/teacher/announcement" icon={MdOutlineAnnouncement}>
          Announcement
        </Li>
        <Li to="/teacher/year" icon={VscDebugStart}>
          Start Year
        </Li>
        <Li onClick={logoutHandler} to="/login" icon={ImExit}>
          Logout
        </Li>
      </Sidebar>
      <Content>{props.children}</Content>
    </Nav>
  );
}

export default TeacherNav;
