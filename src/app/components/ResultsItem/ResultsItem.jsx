import React from 'react';
import PropTypes from 'prop-types';
import {gaUtils} from 'dgx-react-ga';

class ResultsItem extends React.Component {
  constructor(props) {
    super(props);

    this.createMarkup = this.createMarkup.bind(this);
    this.generateWholeRowClass = this.generateWholeRowClass.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderImage = this. renderImage.bind(this);
  }

  /**
   * createMarkup(text)
   * The function converts the plain texts in to html inner text style.
   * As a result, it helps encode special characters.
   *
   * @param {string} text
   * @return {object}
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
   * @param {string} src
   * @return {string}
   */
  generateWholeRowClass(src) {
    if (!src) {
      return 'whole-row';
    }

    return '';
  }

  /**
   *
   */
  handleClick(ordinality) {
    // TODO: Fill in proper values for SearchedFrom and ClickTarget
    // Set the dimensions for the following hit
    const customDimensions = [
      // SearchedFrom
      { index: 'dimension1', value: '[Unknown]' },
      // SearchedRepo
      { index: 'dimension2', value: 'BetaSearch' },
      // ClickTarget
      { index: 'dimension3', value: 'Link'},
      // Reserved custom dimensions for the future use
      { index: 'dimension4', value: 'NotSet' },
      { index: 'dimension5', value: 'NotSet' },
    ];

    gaUtils.setDimensions(customDimensions);
    gaUtils.trackGeneralEvent('Beta Search', 'Clickthrough', '[BetaSearch Term]', ordinality);
  }

  /**
   * renderTitle(title, className, wholeRowClass)
   * The function renders the HTML entity presents title.
   * If no title found, it renders the default title "No Title for this Item"
   * for screen reader users and visually hides this title object.
   *
   * @param {string} title
   * @param {string} className
   * @param {string} wholeRowClass
   * @return {object}
   */
  renderTitle(title, className, wholeRowClass) {
    const newTitle = title || 'No Title for this Item';
    const visuallyHiddenClass = title ? '' : 'visuallyHidden';

    return (
      <h2
        className={`${className}-title ${wholeRowClass} ${visuallyHiddenClass}`}
        dangerouslySetInnerHTML={this.createMarkup(newTitle)}
      >
      </h2>
    );
  }

  /**
   * renderImage(className, src, title)
   * The function renders <img> if this.props.thumbnailSrc is true.
   *
   * @param {string} className
   * @param {string} src
   * @param {string} title
   * @return null or {object}
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
          onClick={this.handleClick(this.props.index+1)}
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
  id: PropTypes.string,
  className: PropTypes.string,
  index: PropTypes.number,
  title: PropTypes.string,
  link: PropTypes.string,
  snippet: PropTypes.string,
  thumbnailSrc: PropTypes.string,
  label: PropTypes.string,
  wholeRowClass: PropTypes.string,
};

ResultsItem.defaultProps = {
  lang: 'en',
  id: 'resultsItem',
  className: 'resultsItem',
  index: 0,
};

export default ResultsItem;
