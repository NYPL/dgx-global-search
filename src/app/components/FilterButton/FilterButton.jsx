import React from 'react';

import { FilterIcon } from 'dgx-svg-icons';

const FilterButton = ({ id, className, onClick }) => (
  <button id={id} className={className} onClick={onClick}>
    <FilterIcon
      ariaHidden={true}
      className={`${className}-icon`}
      fill="#837E77"
      height="32px"
      title="filter.icon.svg"
      width="32px"
      viewBox="0 0 32 32"
    />
  </button>
);

FilterButton.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default FilterButton;
