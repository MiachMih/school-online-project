import React from "react";

import { Routes, Route } from "react-router-dom";

import History from "./history/History";
import Profile from "./profile/Profile";
import Billing from "./billing/Billing";
import Announcement from "./announcement/Announcement";
import Schedule from "./schedule/Schedule";
import EditClasses from "./edit-classes/EditClasses";
import Nav from "./Nav";

function Student() {
  /*TODO: fix styling in module.css 

    Change buttons into Links to render components

    Add modal for small screens
  */

  return (
    <>
      <Nav>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/edit-classes" element={<EditClasses />} />
        </Routes>
      </Nav>
    </>
  );
}

export default Student;
