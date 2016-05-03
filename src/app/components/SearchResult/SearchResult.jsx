import React from 'react';

const SearchResult = ({ id, className, index, title, link }) =>
  (
    <a
      id={`${id}-${index}`}
      className={className}
      href={link}
    >
      <li>{title}</li>
    </a>
  );

SearchResult.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  index: React.PropTypes.number,
  title: React.PropTypes.string,
  link: React.PropTypes.string,
};

SearchResult.defaultProps = {
  lang: 'en',
  id: 'searchResult',
  className: 'searchResult',
  index: 0,
  title: React.PropTypes.string,
  link: React.PropTypes.string,
};

export default SearchResult;
