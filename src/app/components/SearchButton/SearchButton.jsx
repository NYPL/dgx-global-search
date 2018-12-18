import React from 'react';
import PropTypes from 'prop-types';

import { BasicButton } from 'dgx-react-buttons';
import { SearchIcon } from '@nypl/dgx-svg-icons';

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
  onClick: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default SearchButton;
