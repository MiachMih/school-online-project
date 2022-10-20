import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchResults from "./SearchResults";
import Search from "./Search";
import { Container } from "../../form/Form";

function AddClasses() {
  // search class by name or subject
  // display matches
  // paginate to have multiple pages for search results
  return (
    <Container>
      <Search />
      <Routes>
        <Route path="/:category" element={<SearchResults />} />
      </Routes>
    </Container>
  );
}

export default AddClasses;
