import React from 'react';

import FilterIcon from '../FilterIcon/FilterIcon.jsx';
import FilterList from '../FilterList/FilterList.jsx';

const Filter = ({ className }) => (
  <div className={`${className}Wrapper`}>
    <p>Filter your search:</p>
    <FilterIcon className={`${className}Icon`} />
    <FilterList className={`${className}List`} active="active" />
  </div>
);

export default Filter;

Filter.propTypes = {
  className: React.PropTypes.string,
};
