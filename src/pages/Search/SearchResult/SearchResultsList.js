import React from 'react';

import Card from "~components/Card";

function SearchResultsList({content, searchResults}) {
  return (
    <ul>
      {
        searchResults.map(({node}, index) => (
          <li key={index}>
            <Card post={node} content={content} tagHistoryReplace/>
          </li>
        ))
      }
    </ul>
  );
}

export default SearchResultsList;
