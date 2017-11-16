// Import libraries
import { gaUtils } from 'dgx-react-ga';
import gaConfig from '../../../gaConfig.js';
import {
  mapObject as _mapObject,
} from 'underscore';

/**
 * generateCustomDimensions(searchedFrom = 'Unknown', target = 'Unknown')
 * The function is to return the dimensions for GA events.
 * Dimension2/SearchedRepo is always 'BetaSearch'.
 * Dimension4 and dimension5 are reserved now.
 *
 * @param {String} searchedFrom - The value of dimension1/SearchedFrom of the GA event
 * @param {String} target - The value of dimension3/ClickTarget of the GA event
 * @return {Array}
 */
const generateCustomDimensions = (searchedFrom = 'Unknown', target = 'Unknown') => {
  const dimensionArray = [];

  gaConfig.dimensions.dimension1 = searchedFrom;
  gaConfig.dimensions.dimension3 = target;

  _mapObject(gaConfig.dimensions, (value, key) => {
    dimensionArray.push({ index: key, value });
  });

  return dimensionArray;
};

/**
 * sendGAEvent(action, label, value, searchedFrom, target)
 * The function to send a GA event along with its dimensions.
 * Dimension2/SearchedRepo is always 'BetaSearch'
 *
 * @param {String} action - The Action of the GA event
 * @param {String} label - The Label of the GA event
 * @param {Int} value - The Value of the GA event
 * @param {String} searchedFrom - The value of dimension1/SearchedFrom of the GA event
 * @param {String} target - The value of dimension3/ClickTarget of the GA event
 */
const sendGAEvent = (action, label, value, searchedFrom, target) => {
  // The array for gaUtils.setDimensions should be
  // [
  //  {index: dimension1, value: 'dimension1 value'},
  //  {index: dimension2, value: 'dimension2 value'},
  //  etc....
  // ]
  gaUtils.setDimensions(generateCustomDimensions(searchedFrom, target));
  gaUtils.trackGeneralEvent('Search', action, label, value);
};

export { sendGAEvent };
