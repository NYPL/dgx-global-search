import React from 'react';

import FilterIcon from '../FilterIcon/FilterIcon.jsx';

const Filter = ({
  className
}) => (
  <div className={`${className}Wrapper`}>
    <p>Filter your search:</p>
    <FilterIcon className={`${className}Icon`} />
  </div>
);

export default Filter;
