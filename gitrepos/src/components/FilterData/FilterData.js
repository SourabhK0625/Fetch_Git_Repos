import React from "react";
import "./Filter.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const FilterData = ({
  isOpen,
  toggleDropdown,
  repoData,
  setRepoData,
  stars,
  setStars,
}) => {
  const handleStarsSort = (sortOrder) => {
    const sortedData = [...repoData].sort((a, b) => {
      const indexA = repoData.findIndex((item) => item === a);
      const indexB = repoData.findIndex((item) => item === b);
      const lengthA = stars[indexA]?.length || 0;
      const lengthB = stars[indexB]?.length || 0;

      if (sortOrder === "ascending") {
        return lengthA - lengthB;
      } else {
        return lengthB - lengthA;
      }
    });
    setRepoData(sortedData);
  };

  const handleNameSort = (sortOrder) => {
    const sortedData = [...repoData].sort((a, b) => {
      if (sortOrder === "ascending") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setRepoData(sortedData);
  };

  return (
    <div className="dropdown-main">
      <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
        <DropdownToggle caret className="menu-buttons">
          Close
        </DropdownToggle>
        <DropdownMenu className="menu-items">
          <DropdownItem
            className="menu-buttons"
            onClick={() => handleStarsSort("ascending")}
          >
            Stars (Ascending)
          </DropdownItem>
          <DropdownItem
            className="menu-buttons"
            onClick={() => handleStarsSort("descending")}
          >
            Stars (Descending)
          </DropdownItem>
          <DropdownItem
            className="menu-buttons"
            onClick={() => handleNameSort("ascending")}
          >
            Name (Ascending)
          </DropdownItem>
          <DropdownItem
            className="menu-buttons"
            onClick={() => handleNameSort("descending")}
          >
            Name (Descending)
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default FilterData;
