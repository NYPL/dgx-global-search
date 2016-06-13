import React from 'react';

const FilterItem = ({
  className,
  onClick,
  label
}) => (
    <li
      className={className}
      onClick={onClick}
    >
      {label}
    </li>

);

export default FilterItem;