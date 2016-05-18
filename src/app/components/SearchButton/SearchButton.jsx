import React from 'react';

const SearchButton = ({
  className,
  onClick,
}) => (
  <div className={`${className}Wrapper`}>
    <div className={className} onClick={onClick}>
      SEARCH
    </div>
  </div>
);

SearchButton.propTypes = {
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
};

export default SearchButton;
