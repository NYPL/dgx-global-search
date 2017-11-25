import React from 'react';
import PropTypes from 'prop-types';
import { sendGAEvent } from '../../utils/GAUtils.js';

class ResultsItem extends React.Component {
  constructor(props) {
    super(props);

    this.createMarkup = this.createMarkup.bind(this);
    this.generateWholeRowClass = this.generateWholeRowClass.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderImage = this.renderImage.bind(this);
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
   * generateSearchedFrom
   * Decide which value a GA click through event's dimension1/SearchedFrom should be.
   *
   * @return {string} searchedFrom - The value for dimension1/SearchedFrom
   */
  generateSearchedFrom() {
    const resultsLoadedTime = (this.props.resultsLoadedTime) ?
      parseInt(this.props.resultsLoadedTime, 10) : undefined;
    const querySentTime = (this.props.queriesForGA.timestamp) ?
     parseInt(this.props.queriesForGA.timestamp, 10) : undefined;
    const querySentFrom = (this.props.queriesForGA.searchedFrom) ?
      this.props.queriesForGA.searchedFrom : '';
    let searchedFrom = 'Unknown';

    if (!querySentTime || !querySentFrom) {
      return searchedFrom;
    }

    if ((resultsLoadedTime - querySentTime) > 60000) {
      searchedFrom = 'Bookmark';
    } else {
      if (querySentFrom === 'header_search') {
        searchedFrom = 'HeaderSearch';
      } else if (querySentFrom === 'betasearch_link') {
        searchedFrom = 'BetaSearchLink';
      } else if (querySentFrom === 'betasearch') {
        searchedFrom = 'BetaSearchForm';
      } else {
        return searchedFrom;
      }
    }

    return searchedFrom;
  }

  /**
   * sendGAClickthroughEvent(index, target)
   * Sending click through event to Google Analytics along with ordinality of link
   * and other dimension values
   *
   * @param {int} index - The value for GA event value
   * @param {string} target - The value for GA event dimension3/ClickTarget
   */
  sendGAClickthroughEvent(index, target) {
    // Index is 0-based, we need ordinality to start at 1.
    const ordinality = (index) ? index + 1 : 0;
    // Check if a click through has already happened once. We only send the first click through
    if (!this.props.isGAClickThroughClicked) {
      // target is the HTML element that the click through happened on
      sendGAEvent(
        'Clickthrough',
        this.props.searchKeyword,
        ordinality,
        this.generateSearchedFrom(),
        target
      );
      this.props.updateGAClickThroughClicked(true);
    }
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
        onClick={() => {
          this.sendGAClickthroughEvent(this.props.index, 'ResultTitle');
        }}
      >
      </h2>
    );
  }

  /**
   * renderImage(className, src)
   * The function renders <img> if this.props.thumbnailSrc is true.
   *
   * @param {string} className
   * @param {string} src
   * @return null or {object}
   */
  renderImage(className, src) {
    if (!src) {
      return null;
    }

    return (
      <div
        className={`${className}-imageWrapper`}
        onClick={() => {
          this.sendGAClickthroughEvent(this.props.index, 'ResultPicture');
        }}
      >
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
  id: PropTypes.string,
  className: PropTypes.string,
  index: PropTypes.number,
  title: PropTypes.string,
  link: PropTypes.string,
  snippet: PropTypes.string,
  thumbnailSrc: PropTypes.string,
  label: PropTypes.string,
  wholeRowClass: PropTypes.string,
  isGAClickThroughClicked: PropTypes.bool,
  updateGAClickThroughClicked: PropTypes.func,
  searchKeyword: PropTypes.string,
  resultsLoadedTime: PropTypes.number,
  queriesForGA: PropTypes.object,
};

ResultsItem.defaultProps = {
  lang: 'en',
  id: 'resultsItem',
  className: 'resultsItem',
  index: 0,
  resultsLoadedTime: '',
  queriesForGA: {},
};

export default ResultsItem;
