import React from 'react';

const SearchButton = ({
  className,
  onClick
}) => (
  <div className={`${className}Wrapper`}>
    <div className={className} onClick={onClick}>
      SEARCH
    </div>
  </div>
);

export default SearchButton;
