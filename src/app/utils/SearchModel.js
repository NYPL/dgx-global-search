// Import libraries
import {
  map as _map,
  isArray as _isArray,
  isEmpty as _isEmpty,
  filter as _filter,
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

/**
 * fetchSearchFacetsList()
 * The function returns a preset facet list.
 *
 * @return {Array}
 */
const fetchSearchFacetsList = () =>
  [
    {
      anchor: 'All',
      label: '',
    },
    {
      anchor: 'Digital Collections',
      label: 'digital_collections',
    },
    {
      anchor: 'Exhibitions',
      label: 'exhibitions',
    },
    {
      anchor: 'Archives',
      label: 'archives',
    },
    {
      anchor: 'Audio / Visual',
      label: 'audio_video',
    },
    {
      anchor: 'Blog',
      label: 'blog',
    },
    {
      anchor: 'Projects',
      label: 'projects',
    },
    {
      anchor: 'Events / Classes',
      label: 'events_classes',
    },
    {
      anchor: 'Recommendations',
      label: 'recommendations',
    },
    {
      anchor: 'Locations',
      label: 'locations',
    },
  ];

const extractSearchElement = () => {
  // const requestComnbo = fetchSearchRequest();

  const requestComnbo = 'dog more:exhibitions';

  if (!requestComnbo) {
    return ({
      searchKeyword: '',
      searchFacet: '',
    });
  }

  const comboArray = requestComnbo.trim().split('more');

  return ({
    searchKeyword: comboArray[0].trim() || '',
    searchFacet: comboArray[1].trim().replace(/(^:)/g, '') || '',
  });
};

/**
 * fetchSearchRequest(data)
 * The function gets search request, which is a combo of the search keyword and the facet.
 *
 * @param {Object} data
 * @return {String}
 */
const fetchSearchRequest = (data) => {
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
 * The function gets the display names of the category where the search
 * result item is from.
 * It takes an array and return an string.
 *
 * @param {Array} labelsArray
 * @return {String}
 */
const fetchDisplayName = (labelsArray) => {
  if (!_isArray(labelsArray) || _isEmpty(labelsArray)) {
    return '';
  }

  const displayNameArray = _map(labelsArray, (label) => {
    if (!label.displayName) {
      return '';
    }

    return label.displayName;
  });

  const searchFacet = extractSearchElement().searchFacet;

  if (!searchFacet) {
    return displayNameArray[0];
  }

  return _filter(displayNameArray, (displayName) =>
    displayName.toLowerCase() === searchFacet
  )[0];
};

/**
 * fetchItemFeature(item, feature)
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

export { fetchResultLength, fetchResultItems, fetchSearchFacetsList };
