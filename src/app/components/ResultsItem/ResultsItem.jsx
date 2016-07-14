import React from 'react';

/**
 * renderImage(className, src, title)
 * The function renders <img> if this.props.thumbnailSrc is true.
 *
 * @param {className} string
 * @param {src} string
 * @param {title} string
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

/**
 * generateWholeRowClass(src)
 * The function generates the class name for the component based on the exsistence
 * of the image data.
 * If no image data, the class name will be 'whole-row' so the html element will be
 * applied to the matched styles.
 *
 * @param {src} string
 * @return string
 */
const generateWholeRowClass = (src) => {
  if (!src) {
    return 'whole-row';
  }

  return '';
};

/**
 * createMarkup(text)
 * The function converts the plain texts in to html inner text style.
 * As a result, it helps encode special characters.
 *
 * @param {text} string
 * @return object
 */
const createMarkup = (text) => ({ __html: text });

const renderTitle = (title, className, wholeRowClass) => {
  const newTitle = title ? title : 'No title for this item';

  return (
    <h3
      className={`${className}-title ${wholeRowClass}`}
      dangerouslySetInnerHTML={createMarkup(newTitle)}
    >
    </h3>
  );
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
      {renderTitle(title, className, wholeRowClass)}
    </a>
    <p
      className={`${className}-linkText ${wholeRowClass}`}
    >
      {link}
    </p>
    <p
      className={`${className}-snippet ${wholeRowClass}`}
      dangerouslySetInnerHTML={createMarkup(snippet)}
    >
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
