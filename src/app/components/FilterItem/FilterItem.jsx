import React from 'react';

// Import libraries
import { RadioActiveIcon, RadioInactiveIcon } from 'dgx-svg-icons';

const FilterItem = ({
  className,
  onClick,
  label,
  name,
}) => {
  const onKeyPress = (event) => {
    if (event && event.charCode === 13) {
      onClick();
    }
  };

  const radioIcon = (className === 'selected') ?
    <RadioActiveIcon className={`radioIcon ${className}`} ariaHidden /> :
    <RadioInactiveIcon className={`radioIcon ${className}`} ariaHidden />;

  return (
    <div>
      <input
        id={`filterItem-${name}`}
        type="radio"
        className="visuallyHidden"
        onClick={onClick}
        onKeyPress={onKeyPress}
        aria-labelledby={`filterItem-${name}-label`}
      >
      </input>
      <label
        id={`filterItem-${name}-label`}
        className={className}
        htmlFor={`filterItem-${name}`}
      >
        {label}
        {radioIcon}
      </label>
    </div>
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
