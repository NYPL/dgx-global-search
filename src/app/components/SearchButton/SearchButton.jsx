import React from 'react';

import { SearchIcon } from 'dgx-svg-icons';

const SearchButton = ({
  id,
  className,
  label,
  onClick,
}) => (
  <div id={`${id}-wrapper`} className={`${className}-wrapper`}>
    <button id={id} className={className} onClick={onClick}>
      <SearchIcon
        ariaHidden
        className={`${className}-SearchIcon`}
        fill="#FFF"
        height="32"
        title="search.icon.svg"
        width="32"
        viewBox="0 0 32 32"
      />
      <p>{label}</p>
    </button>
  </div>
);

SearchButton.propTypes = {
  onClick: React.PropTypes.func,
  label: React.PropTypes.string,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default SearchButton;
