import React from "react";

function Page(props) {
  const { page, limit, style } = props;

  function clickHandler() {
    props.setSearchParams({ limit, page });
  }

  return (
    <button className={style} onClick={clickHandler}>
      {page + 1}
    </button>
  );
}

export default Page;
