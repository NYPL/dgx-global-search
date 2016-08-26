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

  return (
    <div>
      <input
        id={label}
        type="radio"
        className="visuallyHidden"
        onClick={onClick}
        onKeyPress={onKeyPress}
      >
      </input>
      <label
        className={className}
        htmlFor={label}
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
