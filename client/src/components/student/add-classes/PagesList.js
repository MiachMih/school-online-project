import React from "react";
import Page from "./Page";
import styles from "./PageList.module.css";

const defaultStyle = `${styles.btn} ${styles.raise}`;
function PageList(props) {
  const { pages_list, limit, currentPage } = props;
  return (
    <div className={styles.container}>
      {pages_list.map((page) => {
        const style =
          parseInt(currentPage, 10) === page
            ? `${defaultStyle} ${styles.current}`
            : `${defaultStyle}`;
        return (
          <Page
            key={page}
            page={page}
            setSearchParams={props.setSearchParams}
            limit={limit}
            style={style}
          />
        );
      })}
    </div>
  );
}

export default PageList;
