// Import libraries
import { map as _map } from 'underscore';

/**
 * fetchResultLength(data)
 * The function gets the total search result number.
 *
 * @param {Object} item
 * @return {Num}
 */
const fetchResultLength = (data) => {
  try {
    const {
      attributes: {
        meta: {
          'total-results': totalResults = 0,
        },
      },
    } = data;

    return totalResults;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

/**
 * fetchItemThumbnailSrc(item)
 * The function gets thumbnail image src from an result item.
 *
 * @param {Object} item
 * @return {String}
 */
const fetchSearchKeyword = (data) => {
  try {
    const {
      attributes: {
        q = '',
      },
    } = data;

    return q;
  } catch (e) {
    console.log(e);
    return '';
  }
};

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
 * All the features are under the item's attributes object,
 * so if attributes is missing, it passes default empty features.
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
 * @param {Object} data
 * @return {Array}
 */
const fetchResultItems = (data) => {
  if (!data || !data.items) {
    return [];
  }

  return _map(data.items, (item) =>
    (fetchItem(item))
  );
};

export { fetchResultLength, fetchResultItems, fetchSearchKeyword };
