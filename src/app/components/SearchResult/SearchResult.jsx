import React from 'react';

const SearchResult = ({
  id,
  className,
  index,
  title,
  link,
  snippet,
  thumbnailSrc
}) => (
  <li>
    <a
      id={`${id}-${index}`}
      className={className}
      href={link}
    >
      <h3>{title}</h3>
      <p>{snippet}</p>
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
