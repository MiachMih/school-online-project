import React from "react";
import DisplayInfo from "./DisplayInfo";

function DisplayAnnouncements(props) {
  const { announcements } = props;
  return (
    <>
      {announcements.map((announcement) => {
        return (
          <DisplayInfo
            key={announcement._id}
            header={announcement.header}
            message={announcement.message}
            img={announcement.img}
          />
        );
      })}
    </>
  );
}

export default DisplayAnnouncements;
