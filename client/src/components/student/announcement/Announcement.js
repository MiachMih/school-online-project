import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMaxPages } from "../../../store/announcement-slice";
import MakeScroll from "./MakeScroll";

function Announcement() {
  const dispatch = useDispatch();
  const limit = 1;
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    async function fetchMaxPages() {
      const response = await dispatch(getMaxPages(limit));
      setMaxPages(response);
    }
    fetchMaxPages();
  }, []);

  return <MakeScroll limit={limit} maxPages={maxPages} />;
}

export default Announcement;
