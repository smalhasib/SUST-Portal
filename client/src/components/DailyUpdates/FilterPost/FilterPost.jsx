import React from "react";
import "./FilterPost.css";

const FilterPost = ({ filterHandler }) => {
  const filterSelectHandler = (e) => {
    filterHandler(e.target.innerText);
    
  };

  return (
    <>
      <div className="filterPost">
        <div className="filter_container">
          <h2>Filter Options</h2>
          <div className="filter_element">
            <i className="fas fa-university"></i>
            <p className="link" onClick={filterSelectHandler}>
              All
            </p>
          </div>
          <div className="filter_element">
            <i className="fas fa-university"></i>
            <p className="link" onClick={filterSelectHandler}>
              Educational
            </p>
          </div>
          <div className="filter_element">
            <i className="fas fa-briefcase"></i>
            <p className="link" onClick={filterSelectHandler}>
              Official
            </p>
          </div>
          <div className="filter_element">
            <i className="fas fa-vote-yea"></i>
            <p className="link" onClick={filterSelectHandler}>
              Cultural
            </p>
          </div>
          <div className="filter_element">
            <i className="fas fa-vote-yea"></i>
            <p className="link" onClick={filterHandler}>
              Organization
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPost;
