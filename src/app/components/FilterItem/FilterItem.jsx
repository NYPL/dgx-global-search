import React from 'react';

import { CircleDashIcon } from 'dgx-svg-icons';

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
      <CircleDashIcon className={`circleDashIcon ${className}`} />
    </li>

);

export default FilterItem;