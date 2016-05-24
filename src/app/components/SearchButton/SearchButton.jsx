import React from 'react';

const SearchButton = ({
  className,
  label,
  onClick,
}) => (
  <div className={`${className}-wrapper`}>
    <button className={className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FFF" viewBox="0 0 32 32">
        <title>search.icon.v1</title>
        <path
          d={'M25.26014,23.627l-3.76-3.75948a8.53632,8.53632,0,1,0-2.07145,1.85393l3.86877,' +
            '3.86822A1.38781,1.38781,0,0,0,25.26014,23.627ZM9.109,14.52943a5.75012,5.75012,0,1,1,' +
            '5.75012,5.74948A5.75662,5.75662,0,0,1,9.109,14.52943Z'}
        />
      </svg>
      <p>{label}</p>
    </button>
  </div>
);

SearchButton.propTypes = {
  onClick: React.PropTypes.func,
  label: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default SearchButton;
