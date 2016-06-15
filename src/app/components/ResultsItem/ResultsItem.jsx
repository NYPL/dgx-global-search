import React from 'react';
import { decodeHtmlEntities } from './../../utils/decodeHtmlEntities.js';

/**
 * renderImage()
 * The function render <img> if this.props.thumbnailSrc is true.
 *
 * @return null or object
 */
const renderImage = (className, src, title) => {
  if (!src) {
    return null;
  }

  return (
    <div className={`${className}-imageWrapper`}>
      <img
        className={`${className}-image`}
        src={src}
        alt={title}
      />
    </div>
  );
};



const generateWholeRowClass = (src) => {
  if (!src) {
    return 'whole-row';
  }

  return '';
};

const ResultsItem = ({
  className,
  id,
  index,
  label,
  link,
  snippet,
  title,
  thumbnailSrc,
  wholeRowClass = generateWholeRowClass(thumbnailSrc),
}) => (
  <li
    id={`${id}-${index}`}
    className={`${className} ${wholeRowClass}`}
  >
    <p
      className={`${className}-label ${wholeRowClass}`}
    >
      {label}
    </p>
    <a
      className={`${className}-link ${wholeRowClass}`}
      href={link}
    >
      {renderImage(className, thumbnailSrc, title)}
      <h3
        className={`${className}-title ${wholeRowClass}`}
      >
        {decodeHtmlEntities(title)}
      </h3>
    </a>
    <p
      className={`${className}-linkText ${wholeRowClass}`}
    >
      {link}
    </p>
    <p
      className={`${className}-snippet ${wholeRowClass}`}
    >
      {decodeHtmlEntities(snippet)}
    </p>
  </li>
);


ResultsItem.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  index: React.PropTypes.number,
  title: React.PropTypes.string,
  link: React.PropTypes.string,
  snippet: React.PropTypes.string,
  thumbnailSrc: React.PropTypes.string,
  label: React.PropTypes.string,
  wholeRowClass: React.PropTypes.string,
};

ResultsItem.defaultProps = {
  lang: 'en',
  id: 'resultsItem',
  className: 'resultsItem',
  index: 0,
};

export default ResultsItem;
