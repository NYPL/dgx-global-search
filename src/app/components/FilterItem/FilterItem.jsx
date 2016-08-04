import React from 'react';

// Import libraries
import { CircleDashIcon } from 'dgx-svg-icons';

const FilterItem = ({
  className,
  onClick,
  onKeyPress = (event) => {
    if (event && event.charCode === 13) {
      onClick();
    }
  },
  label,
}) => (
  <li
    className={className}
    onClick={onClick}
    onKeyPress={onKeyPress}
    tabIndex="0"
  >
    {label}
    <CircleDashIcon className={`circleDashIcon ${className}`} />
  </li>
);

FilterItem.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  label: React.PropTypes.string,
};

FilterItem.defaultProps = {
  lang: 'en',
  id: '',
  className: 'filterItem',
  label: '',
};

export default FilterItem;
