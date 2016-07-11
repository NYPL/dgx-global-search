import React from 'react';

// Import libraries
import { CircleDashIcon } from 'dgx-svg-icons';
import { BasicButton } from 'dgx-react-buttons';

const FilterItem = ({
  className,
  onClick,
  onClickDashCircle,
  label,
}) => (
  <li
    className={className}
  >
    <span onClick={onClick}>
      {label}
    </span>
    <BasicButton
      className={`circleDashButton customButton ${className}`}
      label=""
      icon={<CircleDashIcon className={`circleDashIcon ${className}`} />}
      onClick={onClickDashCircle}
    />
  </li>
);

FilterItem.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onClickDashCircle: React.PropTypes.func,
  label: React.PropTypes.string,
};

FilterItem.defaultProps = {
  lang: 'en',
  id: '',
  className: 'filterItem',
  label: '',
};

export default FilterItem;
