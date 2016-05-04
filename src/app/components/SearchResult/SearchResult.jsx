import React from 'react';

const SearchResult = ({ id, className, index, title, link }) => (
  <li>
    <a
      id={`${id}-${index}`}
      className={className}
      href={link}
    >
      {title}
    </a>
  </li>
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
};

export default SearchResult;
