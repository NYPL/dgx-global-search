import React from 'react';

import { BasicButton } from 'dgx-react-buttons';
import { SearchIcon } from 'dgx-svg-icons';

const SearchButton = ({
  id,
  className,
  label,
  onClick,
}) => (
  <div id={`${id}-wrapper`} className={`${className}-wrapper`}>
    <BasicButton
      id={id}
      className={className}
      onClick={onClick}
      icon={
        <SearchIcon
          ariaHidden
          className={`${className}-searchIcon`}
          fill="#FFF"
          height="32"
          title="search.icon.svg"
          width="32"
          viewBox="0 0 32 32"
        />
      }
      label={label}
      labelAccessible={false}
    />
  </div>
);

SearchButton.propTypes = {
  onClick: React.PropTypes.func,
  label: React.PropTypes.string,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default SearchButton;
