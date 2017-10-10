import React from 'react';
import PropTypes from 'prop-types';

// Import libraries
import { RadioActiveIcon, RadioInactiveIcon } from 'dgx-svg-icons';

const FilterItem = ({
  className,
  onClick,
  label,
  name,
}) => {
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
  className: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
};

FilterItem.defaultProps = {
  lang: 'en',
  className: 'filterItem',
  label: '',
};

export default FilterItem;
