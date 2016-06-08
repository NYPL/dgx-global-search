// Import libraries
import {
  map as _map,
  isArray as _isArray
} from 'underscore';

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

const fetchSearchFacets = () => {
  return [
    'all',
    'digital collections',
    'exhibitions',
    'archives',
    'audio / visual',
    'blog',
    'projects',
    'events / classes',
    'recommendations',
  ];
}

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
 * fetchDisplayName(array)
 * The function gets the display name of the category where the search
 * result item is from.
 * It takes an array and return a string.
 *
 * @param {Array} labelsArray
 * @return {String}
 */
const fetchDisplayName = (labelsArray) => {
  if (!_isArray(labelsArray) || !labelsArray[0].displayName) {
    return '';
  }

  return labelsArray[0].displayName;
};

/**
 * fetchItemFeature(item, string)
 * The function gets features from an result item.
 * The second argument indicates which feature it is going to get.
 * If the feature is "labels", it calls fetchDisplayName() to get
 * the display name of the category from the labels array.
 *
 * @param {Object} item
 * @param {String} feature
 * @return {String}
 */
const fetchItemFeature = (item, feature) => {
  if (!item.attributes[feature]) {
    return '';
  }

  if (feature === 'labels') {
    return fetchDisplayName(item.attributes[feature]);
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
      label: '',
    };
  }

  return {
    title: fetchItemFeature(item, 'title'),
    link: fetchItemFeature(item, 'link'),
    snippet: fetchItemFeature(item, 'snippet'),
    thumbnailSrc: fetchItemFeature(item, 'thumbnail-url'),
    label: fetchItemFeature(item, 'labels'),
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
  try {
    return _map(data.items, (item) => (fetchItem(item)));
  } catch (e) {
    console.log(e);
    return [];
  }
};

export { fetchResultLength, fetchResultItems, fetchSearchKeyword, fetchSearchFacets };
