import React from 'react';

import { BasicButton } from 'dgx-react-buttons';
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
      <BasicButton
        className={`filterItemButton customButton ${className}`}
        icon={
          <CircleDashIcon className={`circleDashIcon`} />
        }
        label={`${label} Filter`}
        labelAccessible
      />
    </li>

);

export default FilterItem;