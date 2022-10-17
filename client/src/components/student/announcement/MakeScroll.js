import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DisplayAnnouncements from "./DisplayAnnouncements";
import { getAnnouncements } from "../../../store/announcement-slice";
import InfiniteScroll from "react-infinite-scroller";

function MakeScroll({ limit, maxPages }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  async function fetchAnnouncements() {
    const response = await dispatch(
      getAnnouncements(`page=${page}&limit=${limit}`)
    );

    setData((state) => {
      return [...state, ...response];
    });
    setPage((state) => {
      return state + 1;
    });
  }

  return (
    <InfiniteScroll
      pageStart={page}
      hasMore={page < maxPages}
      loadMore={fetchAnnouncements}
      initialLoad={true}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
      threshold={50}
    >
      <DisplayAnnouncements announcements={data} />
    </InfiniteScroll>
  );
}

export default MakeScroll;
