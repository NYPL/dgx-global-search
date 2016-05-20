import React from 'react';

import FilterButton from '../FilterButton/FilterButton.jsx';
import FilterList from '../FilterList/FilterList.jsx';

const Filter = ({ className }) => (
  <div className={`${className}Wrapper`}>
    <p>Filter your search:</p>
    <FilterButton className={`${className}Icon`} />
    <FilterList className={`${className}List`} active="active" />
  </div>
);

Filter.propTypes = {
  className: React.PropTypes.string,
};

export default Filter;
