import React from 'react';

class ResultsItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  /**
   * createMarkup(text)
   * The function converts the plain texts in to html inner text style.
   * As a result, it helps encode special characters.
   *
   * @param {text} string
   * @return object
   */
  createMarkup(text) {
    return ({ __html: text });
  }

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
  generateWholeRowClass(src) {
    if (!src) {
      return 'whole-row';
    }

    return '';
  }

  /**
   * renderTitle(title, className, wholeRowClass)
   * The function renders the HTML entity presents title.
   * If no title found, it renders the default title "No Title for this Item"
   * for screen reader users and visually hides this title object.
   *
   * @param {title} string
   * @param {className} string
   * @param {wholeRowClass} string
   * @return object
   */
  renderTitle(title, className, wholeRowClass) {
    const newTitle = title || 'No Title for this Item';
    const visuallyHiddenClass = title ? '' : 'visuallyHidden';

    return (
      <h3
        className={`${className}-title ${wholeRowClass} ${visuallyHiddenClass}`}
        dangerouslySetInnerHTML={this.createMarkup(newTitle)}
      >
      </h3>
    );
  }

  /**
   * renderImage(className, src, title)
   * The function renders <img> if this.props.thumbnailSrc is true.
   *
   * @param {className} string
   * @param {src} string
   * @param {title} string
   * @return null or object
   */
  renderImage(className, src) {
    if (!src) {
      return null;
    }

    return (
      <div className={`${className}-imageWrapper`}>
        <img
          className={`${className}-image`}
          src={src}
          alt=""
        />
      </div>
    );
  }

  render() {
    const wholeRowClass = this.generateWholeRowClass(this.props.thumbnailSrc);

    return (
      <li
        id={`${this.props.id}-${this.props.index}`}
        className={`${this.props.className} ${wholeRowClass}`}
      >
        <p
          className={`${this.props.className}-label ${wholeRowClass}`}
        >
          {this.props.label}
        </p>
        <a
          className={`${this.props.className}-link ${wholeRowClass}`}
          href={this.props.link}
          ref={`result-${this.props.index}-item`}
        >
          {this.renderImage(this.props.className, this.props.thumbnailSrc, this.props.title)}
          {this.renderTitle(this.props.title, this.props.className, wholeRowClass)}
        </a>
        <p
          className={`${this.props.className}-linkText ${wholeRowClass}`}
        >
          {this.props.link}
        </p>
        <p
          className={`${this.props.className}-snippet ${wholeRowClass}`}
          dangerouslySetInnerHTML={this.createMarkup(this.props.snippet)}
        >
        </p>
      </li>
    );
  }
}

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
