import React from 'react';

import FilterButton from '../FilterButton/FilterButton.jsx';
import FilterList from '../FilterList/FilterList.jsx';

const Filter = ({ className, facets }) => (
  <div className={`${className}Wrapper`}>
    <p>Filter your search:</p>
    <FilterButton className={`${className}Icon`} />
    <FilterList className={`${className}List`} facets={facets} active="active" />
  </div>
);

Filter.propTypes = {
  className: React.PropTypes.string,
};

export default Filter;
