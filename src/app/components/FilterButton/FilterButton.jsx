import React from 'react';

import FilterIcon from '../FilterIcon/FilterIcon.jsx';

const FilterButton = ({ className, onClick }) => (
  <span className={className} onClick={onClick}>
    <FilterIcon width="32px" height="32px" fill="#837E77" />
  </span>
);

FilterButton.propTypes = {
  className: React.PropTypes.string,
};

export default FilterButton;
