import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchResults from "./SearchResults";
import Search from "./Search";

function AddClasses() {
  // search class by name or subject
  // display matches
  // paginate to have multiple pages for search results
  return (
    <div>
      <Search />
      <Routes>
        <Route path="/:category" element={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default AddClasses;
