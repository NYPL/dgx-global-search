import React from 'react';

import FilterIcon from '../FilterIcon/FilterIcon.jsx';

const Filter = ({ id, className }) => (
  <div id={`${id}-wrapper`} className={`${className}-wrapper`}>
    <p>Filter your search:</p>
    <FilterIcon id={`${id}-icon`} className={`${className}-icon`} />
  </div>
);

Filter.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default Filter;
