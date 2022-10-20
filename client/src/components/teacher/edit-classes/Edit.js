import React, { useState } from "react";
import Search from "./Search";
import SearchResult from "./SearchResult";
import { Container } from "../../form/Form";

function Edit() {
  const [searchResult, setSearchResult] = useState(null);

  return (
    <Container>
      <Search setSearchResult={setSearchResult} />
      {searchResult && (
        <SearchResult
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
      )}
    </Container>
  );
}

export default Edit;
