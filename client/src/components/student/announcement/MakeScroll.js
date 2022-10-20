import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DisplayAnnouncements from "./DisplayAnnouncements";
import Loader from "../../form/Loader";
import { getAnnouncements } from "../../../store/announcement-slice";
import InfiniteScroll from "react-infinite-scroller";
import { Container } from "../../form/Form";

function MakeScroll({ limit, maxPages }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  async function fetchAnnouncements() {
    const response = await dispatch(
      getAnnouncements(`page=${page}&limit=${limit}`)
    );

    // console.log(data);

    setData((state) => {
      return [...state, ...response];
    });
    setPage((state) => {
      return state + 1;
    });
  }

  return (
    <Container>
      <InfiniteScroll
        pageStart={page}
        hasMore={page < maxPages}
        loadMore={fetchAnnouncements}
        initialLoad={true}
        loader={<Loader />}
        threshold={50}
      >
        <DisplayAnnouncements announcements={data} />
      </InfiniteScroll>
    </Container>
  );
}

export default MakeScroll;
