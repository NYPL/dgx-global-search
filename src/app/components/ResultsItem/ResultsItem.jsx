import React from 'react';

const SearchResult = ({
  id,
  className,
  index,
  title,
  link,
  snippet,
  thumbnailSrc,
  label,
}) => (
  <li id={`${id}-${index}`} className={className}>
    <p className={`${className}-label`}>{label}</p>
    <a
      className={`${className}-link`}
      href={link}
    >
      <img
        src={thumbnailSrc}
        alt={title}
        style={SearchResult.styles.thumbnailImage}
      />
      <h3>{title}</h3>
    </a>
    <p className={`${className}-linkText`}>{link}</p>
    <p className={`${className}-snippet`}>{snippet}</p>
  </li>
);

SearchResult.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  index: React.PropTypes.number,
  title: React.PropTypes.string,
  link: React.PropTypes.string,
  snippet: React.PropTypes.string,
  thumbnailSrc: React.PropTypes.string,
  label: React.PropTypes.string,
};

SearchResult.defaultProps = {
  lang: 'en',
  id: 'searchResult',
  className: 'searchResult',
  index: 0,
};

SearchResult.styles = {
  thumbnailImage: {
    display: 'none',
    height: '200px',
  },
};

export default SearchResult;
