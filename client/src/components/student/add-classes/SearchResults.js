import React, { useEffect, useState } from "react";
import { fetchClassesBySubject } from "../../../store/classes-slice";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import DisplayClass from "./DisplayClass";

function SearchResults() {
  const dispatch = useDispatch();
  const params = useParams();
  const limit = 1;
  const [searchParams, setSearchParams] = useSearchParams({
    page: 0,
    limit: limit,
  });
  const [maxPages, setMaxPages] = useState(0);
  const [nextPageAvailable, setNextPageAvailable] = useState(true);
  const [previousPageAvailable, setPreviousPageAvailable] = useState(true);
  const [displayClasses, setDisplayClasses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await dispatch(
        fetchClassesBySubject(params.category, searchParams.toString())
      );
      setDisplayClasses(response.result);
      setMaxPages(parseInt(response.maxPages, 10));
    }
    fetchData();
  }, [dispatch, params, searchParams]);

  function previousPageHandler() {
    const currentPage = parseInt(searchParams.get("page"), 10);
    if (currentPage <= 0) {
      return setPreviousPageAvailable(false);
    }
    setNextPageAvailable(true);
    setSearchParams({ page: currentPage - 1, limit: limit });
  }

  function nextPageHandler() {
    const currentPage = parseInt(searchParams.get("page"), 10);
    if (currentPage >= maxPages - 1) {
      return setNextPageAvailable(false);
    }
    setPreviousPageAvailable(true);
    setSearchParams({ page: currentPage + 1, limit: limit });
  }

  return (
    <div>
      <div>
        {displayClasses.map((item) => {
          return <DisplayClass key={item._id} result={item} />;
        })}
      </div>
      SearchResults Current page: {parseInt(searchParams.get("page"), 10) + 1}
      <button onClick={previousPageHandler}>Previous Page</button>
      <button onClick={nextPageHandler}>Next Page</button>
    </div>
  );
}

export default SearchResults;
