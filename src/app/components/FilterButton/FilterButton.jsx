import React from 'react';

import FilterIcon from '../FilterIcon/FilterIcon.jsx';

const onClick = () => {
  console.log('filter icon is clicked.');
}

const FilterButton = ({ className }) => (
  <span className={className} onClick={onClick}>
    <FilterIcon fill="#000" />
  </span>
);

FilterButton.propTypes = {
  className: React.PropTypes.string,
};

export default FilterButton;
