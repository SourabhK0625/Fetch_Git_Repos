import React, { useState } from "react";
import { Input } from "reactstrap";
import "./Search.css";

const Search = ({ dataList, searchType, setData, handleDefaultData }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchFilter = (event) => {
    const searchWord = event.target.value;
    setSearchValue(searchWord);
    const newFilter = dataList?.filter((data) => {
      if (data[searchType]?.toLowerCase().includes(searchWord.toLowerCase())) {
        return data[searchType]
          .toLowerCase()
          .includes(searchWord.toLowerCase());
      }
    });

    if (searchWord === "") {
      handleDefaultData();
    } else {
      setData(newFilter);
    }
  };

  return (
    <div className="search-main">
      <i class="fa fa-search" aria-hidden="true"></i>
      <Input
        type="search"
        placeholder="Search Here.."
        value={searchValue}
        onChange={handleSearchFilter}
      />
    </div>
  );
};

export default Search;
