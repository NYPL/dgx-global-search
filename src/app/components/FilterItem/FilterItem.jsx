import React from 'react';

// Import libraries
import { RadioActiveIcon, RadioInactiveIcon } from 'dgx-svg-icons';

const FilterItem = ({
  className,
  onClick,
  label,
}) => {
  const onKeyPress = (event) => {
    if (event && event.charCode === 13) {
      onClick();
    }
  };

  const radioIcon = (className === 'selected') ?
    <RadioActiveIcon className={`radioIcon ${className}`} ariaHidden /> :
    <RadioInactiveIcon className={`radioIcon ${className}`} ariaHidden />;
  const ariaPressed = (className === 'selected') ? "true" : "false";

  return (
    <li
      className={className}
      onClick={onClick}
      onKeyPress={onKeyPress}
      tabIndex="0"
      role="button"
      aria-pressed={ariaPressed}
    >
      {label}
      {radioIcon}
    </li>
  );
};

FilterItem.propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  label: React.PropTypes.string,
};

FilterItem.defaultProps = {
  lang: 'en',
  className: 'filterItem',
  label: '',
};

export default FilterItem;
