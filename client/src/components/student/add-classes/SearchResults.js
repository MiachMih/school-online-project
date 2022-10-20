import React, { useEffect, useState } from "react";
import { fetchClassesBySubject } from "../../../store/classes-slice";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import DisplayClass from "./DisplayClass";
import PageList from "./PagesList";

function SearchResults() {
  const dispatch = useDispatch();
  const params = useParams();
  const limit = 1;
  const [searchParams, setSearchParams] = useSearchParams({
    page: 0,
    limit: limit,
  });
  const [maxPages, setMaxPages] = useState(0);
  const [displayClasses, setDisplayClasses] = useState([]);
  const pages_list = [...Array(maxPages).keys()];

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

  return (
    <div>
      <div>
        {displayClasses.map((item) => {
          return <DisplayClass key={item._id} result={item} />;
        })}
      </div>

      <PageList
        currentPage={searchParams.get("page")}
        pages_list={pages_list}
        limit={limit}
        setSearchParams={setSearchParams}
      />
    </div>
  );
}

export default SearchResults;
