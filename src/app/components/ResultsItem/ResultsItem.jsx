import React from 'react';
import PropTypes from 'prop-types';
import { generateSearchedFrom, nativeGA } from '../../utils/GAUtils';

class ResultsItem extends React.Component {
  constructor(props) {
    super(props);

    this.createMarkup = this.createMarkup.bind(this);
    this.generateWholeRowClass = this.generateWholeRowClass.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.sendGAClickthroughEvent = this.sendGAClickthroughEvent.bind(this);
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
   * triggerGASend(index, target, event)
   * The function listens to the event of enter key.
   * It then submits the GA event if the event is triggered.
   *
   * @param {int} index - The value for GA event value
   * @param {string} target - The value for GA event dimension3/ClickTarget
   * @param {object} event
   */
  triggerGASend(index, target, event) {
    const {
      link,
    } = this.props;

    if (event) {
      if (event.keyCode === 13 || event.key === 'Enter') {
        this.sendGAClickthroughEvent(index, target, event);
        window.location = link;
      }
    }
  }

  /**
   * sendGAClickthroughEvent(index, target, event)
   * Sending click through event to Google Analytics along with ordinality of link
   * and other dimension values
   *
   * @param {int} index - The value for GA event value
   * @param {string} target - The value for GA event dimension3/ClickTarget
   * @param {object} event - The event happened to the element
   */
  sendGAClickthroughEvent(index, target, event) {
    const {
      isGAClickThroughClicked,
      updateGAClickThroughClicked,
      searchKeyword,
      timeToLoadResults,
      queriesForGA,
    } = this.props;

    // Check if a click through has already happened once. We only send the first click through
    if (!isGAClickThroughClicked) {
      updateGAClickThroughClicked(true);
      // Index is 0-based, we need ordinality to start at 1.
      const ordinality = (Number.isInteger(index)) ? index + 1 : 0;
      let clickTarget = target;
      let isCTRSent = false;

      // Only on the first 10 results we want to track the CTR event
      if (ordinality < 11) {
        // Detect the key click combo and add the result to Dimension3/ClickTarget
        if (event) {
          if (event.ctrlKey || event.metaKey) {
            clickTarget += 'Keyed';
          }
        }
        // We can only simulate click events with no key combo,
        // so we only stop the default behaviors of simple click events
        if (event.type === 'click' && !event.ctrlKey && !event.metaKey) {
          // For passing ReactJS SyntheticEvents
          event.persist();
          event.preventDefault();
        }
        if (!isCTRSent) {
          isCTRSent = true;
          nativeGA(
            'Clickthrough',
            searchKeyword,
            ordinality,
            generateSearchedFrom(timeToLoadResults, queriesForGA),
            clickTarget,
            () => {
              setTimeout(() => { isCTRSent = false; }, 200);
              if (event.isDefaultPrevented) {
                event.target.click();
              }
            },
          );
        }
      }
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
    const {
      index,
    } = this.props;
    const newTitle = title || 'No Title for this Item';
    const visuallyHiddenClass = title ? '' : 'visuallyHidden';

    return (
      <h2
        className={`${className}-title ${wholeRowClass} ${visuallyHiddenClass}`}
        dangerouslySetInnerHTML={this.createMarkup(newTitle)}
        onClick={(e) => {
          this.sendGAClickthroughEvent(index, 'ResultTitle', e);
        }}
        // Add the event listener to right click
        onContextMenu={(e) => {
          this.sendGAClickthroughEvent(
            index,
            'ResultTitleContextmenu',
            e,
          );
        }}
      />
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
    const {
      index,
    } = this.props;

    if (!src) {
      return null;
    }

    return (
      <div
        className={`${className}-imageWrapper`}
        onClick={(e) => {
          this.sendGAClickthroughEvent(index, 'ResultPicture', e);
        }}

        // Add the event listener to right click
        onContextMenu={(e) => {
          this.sendGAClickthroughEvent(
            index,
            'ResultPictureContextmenu',
            e,
          );
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
    const {
      id,
      label,
      index,
      thumbnailSrc,
      title,
      link,
      className,
      snippet,
    } = this.props;

    const wholeRowClass = this.generateWholeRowClass(thumbnailSrc);

    return (
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
          ref={`result-${index}-item`}
          onKeyDown={(e) => { this.triggerGASend(index, 'ResultTitle', e); }}
        >
          {this.renderImage(className, thumbnailSrc, title)}
          {this.renderTitle(title, className, wholeRowClass)}
        </a>
        <p
          className={`${className}-linkText ${wholeRowClass}`}
        >
          {link}
        </p>
        <p
          className={`${className}-snippet ${wholeRowClass}`}
          dangerouslySetInnerHTML={this.createMarkup(snippet)}
        />
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
  isGAClickThroughClicked: PropTypes.bool,
  updateGAClickThroughClicked: PropTypes.func,
  searchKeyword: PropTypes.string,
  timeToLoadResults: PropTypes.number,
  queriesForGA: PropTypes.objectOf(PropTypes.any),
};

ResultsItem.defaultProps = {
  id: 'resultsItem',
  className: 'resultsItem',
  index: 0,
  title: '',
  link: '',
  snippet: '',
  thumbnailSrc: '',
  label: '',
  isGAClickThroughClicked: false,
  updateGAClickThroughClicked: () => {},
  searchKeyword: '',
  timeToLoadResults: '',
  queriesForGA: {},
};

export default ResultsItem;
