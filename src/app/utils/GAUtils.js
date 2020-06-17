// Import libraries
import reactGA from 'dgx-react-ga';
import {
  extend as _extend,
} from 'underscore';
import gaConfig from '../../../gaConfig';

/**
 * generateSearchedFrom(time, queriesForGA)
 * Decide which value a GA click through event's dimension1/SearchedFrom should be.
 *
 * @param {String} time - The time when the result page starts to load
 * @param {object} queriesForGA - The object contains queries for GA click through events
 * @return {String} searchedFrom - The value for dimension1/SearchedFrom
 */
const generateSearchedFrom = (time, queriesForGA) => {
  const timeToLoadResults = (time) ? parseInt(time, 10) : parseInt(new Date().getTime(), 10);
  const querySentTime = (queriesForGA.timestamp) ? parseInt(queriesForGA.timestamp, 10) : undefined;
  const querySentFrom = (queriesForGA.searchedFrom) ? queriesForGA.searchedFrom : '';
  let searchedFrom = 'Unknown';

  // If no queries are indicated, the search should come from directly being typed in the URL
  if (!querySentTime && !querySentFrom) {
    searchedFrom = 'DirectLink';

    return searchedFrom;
  }

  if (!querySentTime) {
    searchedFrom = 'MissingTimestamp';

    return searchedFrom;
  }

  if (!querySentFrom) {
    searchedFrom = 'MissingSearchedFrom';

    return searchedFrom;
  }

  if ((timeToLoadResults - querySentTime) > 60000) {
    searchedFrom = 'DirectLink';
  } else if (querySentFrom === 'header_search') {
    searchedFrom = 'HeaderSearch';
  } else if (querySentFrom === 'betasearch_link') {
    searchedFrom = 'BetaSearchLink';
  } else if (querySentFrom === 'betasearch') {
    searchedFrom = 'BetaSearchForm';
  } else {
    searchedFrom = 'Unknown';
  }

  return searchedFrom;
};

/**
 * generateCustomDimensions(searchedFrom = 'Unknown', target = 'Unknown')
 * The function is to return the dimensions for GA events.
 * Dimension2/SearchedRepo is always 'BetaSearch'.
 * Dimension3/ClickTarget will be removed if the value is null.
 * Dimension4 and dimension5 are reserved now.
 *
 * @param {String} searchedFrom - The value of dimension1/SearchedFrom of the GA event
 * @param {String} target - The value of dimension3/ClickTarget of the GA event
 * @return {object}
 */
const generateCustomDimensions = (searchedFrom = 'Unknown', target = 'Unknown') => {
  gaConfig.dimensions.dimension1 = searchedFrom;

  // Delete dimension3/ClickTarget if target is not set
  if (target == null) {
    delete gaConfig.dimensions.dimension3;
  // Update dimension3/ClickTarget value if there's a valid one
  } else {
    gaConfig.dimensions.dimension3 = target;
  }

  return gaConfig.dimensions;
};

/**
 * sendGAEvent(action, label, value, searchedFrom, target)
 * The function for sending a GA event along with its dimensions.
 * Dimension2/SearchedRepo is always 'BetaSearch'
 *
 * @param {String} action - The Action of the GA event
 * @param {String} label - The Label of the GA event
 * @param {Int} value - The Value of the GA event
 * @param {String} searchedFrom - The value of dimension1/SearchedFrom of the GA event
 * @param {String} target - The value of dimension3/ClickTarget of the GA event
 */
const sendGAEvent = (action, label, value, searchedFrom, target) => {
  const eventObj = _extend({
    category: 'Search',
    action,
    label,
    value,
  }, generateCustomDimensions(searchedFrom, target));

  reactGA.ga.event(eventObj);
};

/**
 * createFunctionWithTimeout(callback, optTimeout)
 * The function serves as a pipe to return the function that is passed to it.
 * It also searves as a timer to execute that function after a certain amount of time.
 *
 * @param {Function} callback - The function to be executed after the time of optTimeout
 * @param {Number} optTimeout
 * @return {Function}
 */
const createFunctionWithTimeout = (callback, optTimeout) => {
  let called = false;

  const fn = () => {
    if (!called) {
      called = true;
      callback();
    }
  };

  setTimeout(fn, optTimeout || 500);

  return fn;
};

/**
 * nativeGA(action, label, value, searchedFrom, target, hitCallback)
 * The function for sending a GA event along with its dimensions.
 * Dimension2/SearchedRepo is always 'BetaSearch'
 *
 * @param {String} action - The Action of the GA event
 * @param {String} label - The Label of the GA event
 * @param {Int} value - The Value of the GA event
 * @param {String} searchedFrom - The value of dimension1/SearchedFrom of the GA event
 * @param {String} target - The value of dimension3/ClickTarget of the GA event
 * @param {Object} hitCallback - The object of the callback function we execute after GA is made
 * The format of it should be { hitCallback: () => {} }
 */
const nativeGA = (action, label, value, searchedFrom, target, hitCallback) => {
  reactGA.ga.ga(
    'send',
    'event',
    'Search',
    action,
    label,
    value,
    generateCustomDimensions(searchedFrom, target),
    { hitCallback: createFunctionWithTimeout(hitCallback) },
  );
};

export { sendGAEvent, generateSearchedFrom, nativeGA };
