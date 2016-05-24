import React from 'react';

import FilterIcon from '../FilterIcon/FilterIcon.jsx';

const Filter = ({ className }) => (
  <div className={`${className}-wrapper`}>
    <p>Filter your search:</p>
    <FilterIcon className={`${className}-icon`} />
  </div>
);

Filter.propTypes = {
  className: React.PropTypes.string,
};

export default Filter;
