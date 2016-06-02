import React from 'react';

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
}

const generateWholeRowClass = (src) => {
  if (!src) {
    return 'whole-row';
  }

  return '';
}

const ResultsItem = ({
  className,
  id,
  index,
  label,
  link,
  snippet,
  title,
  thumbnailSrc,
}) => (
  <li id={`${id}-${index}`}
    className={`${className} ${generateWholeRowClass(thumbnailSrc)}`}
  >
    <p
      className={`${className}-label ${generateWholeRowClass(thumbnailSrc)}`}
    >
      {label}
    </p>
    <a
      className={`${className}-link ${generateWholeRowClass(thumbnailSrc)}`}
      href={link}
    >
      {renderImage(className, thumbnailSrc, title)}
      <h3
        className={`${className}-title ${generateWholeRowClass(thumbnailSrc)}`}
      >
        {title}
      </h3>
    </a>
    <p
      className={`${className}-linkText ${generateWholeRowClass(thumbnailSrc)}`}
    >
      {link}
    </p>
    <p
      className={`${className}-snippet ${generateWholeRowClass(thumbnailSrc)}`}
    >
      {snippet}
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
};

ResultsItem.defaultProps = {
  lang: 'en',
  id: 'resultsItem',
  className: 'resultsItem',
  index: 0,
};

export default ResultsItem;
