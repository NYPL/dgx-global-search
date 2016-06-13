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
      <CircleDashIcon className={`${className}-circleDashIcon`} />
    </li>

);

export default FilterItem;