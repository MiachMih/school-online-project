import React from "react";

function Page(props) {
  const { page, limit } = props;

  function clickHandler() {
    props.setSearchParams({ limit, page });
  }

  return (
    <div>
      <button onClick={clickHandler}>{page}</button>
    </div>
  );
}

export default Page;
