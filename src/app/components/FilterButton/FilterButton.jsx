import React from 'react';

import FilterIcon from '../FilterIcon/FilterIcon.jsx';

const FilterButton = ({ id, className, onClick }) => (
  <button id={id} className={className} onClick={onClick}>
    <FilterIcon className={`${className}-icon`} width="32px" height="32px" fill="#837E77" />
  </button>
);

FilterButton.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default FilterButton;
