// Import libraries
import { ga } from 'dgx-react-ga';
import gaConfig from '../../../gaConfig.js';
import {
  extend as _extend,
} from 'underscore';

/**
 * generateCustomDimensions(searchedFrom = 'Unknown', target = 'Unknown')
 * The function is to return the dimensions for GA events.
 * Dimension2/SearchedRepo is always 'BetaSearch'.
 * Dimension4 and dimension5 are reserved now.
 *
 * @param {String} searchedFrom - The value of dimension1/SearchedFrom of the GA event
 * @param {String} target - The value of dimension3/ClickTarget of the GA event
 * @return {object}
 */
const generateCustomDimensions = (searchedFrom = 'Unknown', target = 'Unknown') => {
  gaConfig.dimensions.dimension1 = searchedFrom;
  gaConfig.dimensions.dimension3 = target;

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

  ga.event(eventObj);
};

export { sendGAEvent };
