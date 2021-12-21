import React from "react";
import "./FilterPost.css";
import {Link} from 'react-router-dom'
const FilterPost = () => {
  return (
    <>
      <div className="filterPost">
        <div className="filter_container">
          <h2>Filter Options</h2>
          <div className="filter_element">
            <i class="fas fa-university"></i>
           <Link to='/home' className="link"> Educational</Link>
          </div>
          <div className="filter_element">
            <i class="far fa-building"></i>
           <Link to='/home' className="link"> Departmental</Link>
          </div>
          <div className="filter_element">
          <i class="fas fa-briefcase"></i>
           <Link to='/home' className="link">Official</Link>
          </div>
          <div className="filter_element">
            <i class="fas fa-vote-yea"></i>
           <Link to='/home' className="link">Political</Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default FilterPost;
