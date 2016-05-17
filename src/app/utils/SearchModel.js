// Import libraries
import { map as _map } from 'underscore';

/**
 * fetchResultLength(data)
 * The function gets the total search result number.
 *
 * @param {Object} item
 * @return {String}
 */
const fetchResultLength = (data) => data.attributes.meta['total-results'];

/**
 * fetchItemThumbnailSrc(item)
 * The function gets thumbnail image src from an result item.
 *
 * @param {Object} item
 * @return {String}
 */
const fetchSearchKeyword = (data) => data.attributes.q;

/**
 * fetchItemFeature(item, string)
 * The function gets features from an result item.
 * The second argument indicates which feature it is going to get.
 *
 * @param {Object} item
 * @param {String} feature
 * @return {String}
 */
const fetchItemFeature = (item, feature) => {
  if (!item.attributes[feature]) {
    return '';
  }

  return item.attributes[feature];
};

/**
 * fetchItem(item)
 * The function gets each search result with its features.
 * It returns an object.
 *
 * @param {Object} item
 * @return {Object}
 */
const fetchItem = (item) => {
  if (!item || !item.attributes) {
    return {
      title: '',
      link: '',
      snippet: '',
      thumbnailSrc: '',
    };
  }

  return {
    title: fetchItemFeature(item, 'title'),
    link: fetchItemFeature(item, 'link'),
    snippet: fetchItemFeature(item, 'snippet'),
    thumbnailSrc: fetchItemFeature(item, 'thumbnail-url'),
  };
};

/**
 * fetchResultItems(data)
 * The function gets search results.
 * It returns an array with each item inside.
 *
 * @param {Array} data
 * @return {Array}
 */
const fetchResultItems = (data) => {
  if (!data.items) {
    return [];
  }

  const resultItems = [];

  return _map(data.items, (item) =>
    (fetchItem(item))
  );
};

export { fetchResultLength, fetchResultItems, fetchSearchKeyword };
