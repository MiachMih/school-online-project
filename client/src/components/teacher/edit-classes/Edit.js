import React, { useState } from "react";
import Search from "./Search";
import SearchResult from "./SearchResult";

function Edit() {
  const [searchResult, setSearchResult] = useState(null);

  return (
    <div>
      <Search setSearchResult={setSearchResult} />
      {searchResult && (
        <SearchResult
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
      )}
    </div>
  );
}

export default Edit;
