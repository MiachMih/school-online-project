import React from "react";
import Page from "./Page";

function PageList(props) {
  const { pages_list, limit } = props;
  return (
    <div>
      {pages_list.map((page) => {
        return (
          <Page
            key={page}
            page={page}
            setSearchParams={props.setSearchParams}
            limit={limit}
          />
        );
      })}
    </div>
  );
}

export default PageList;
