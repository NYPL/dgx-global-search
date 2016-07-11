import React from 'react';

// Import libraries
import { CircleDashIcon } from 'dgx-svg-icons';
// import { BasicButton } from 'dgx-react-buttons';

const FilterItem = ({
  className,
  onClick,
  label,
}) => (
  <li
    className={className}
    onClick={onClick}
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
