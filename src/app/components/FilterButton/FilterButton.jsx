import React from 'react';

import { BasicButton } from 'dgx-react-buttons';
import { FilterIcon } from 'dgx-svg-icons';

const FilterButton = ({ id, className, onClick }) => (
  <BasicButton
    id={id}
    className={className}
    onClick={onClick}
    icon={
      <FilterIcon
        ariaHidden
        className={`${className}-icon`}
        fill="#837E77"
        height="32px"
        title="filter.icon.svg"
        width="32px"
        viewBox="0 0 32 32"
      />
    }
    label="Filter Button"
    labelAccessible
  />
);

FilterButton.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default FilterButton;
