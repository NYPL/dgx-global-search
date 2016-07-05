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

/**
 * extractSearchElements(requestCombo)
 * The function extracts the two searchElements from a searchRequest.
 * The two elements are search keyword and search facet.
 * It then returns an object that consists of these two elements.
 *
 * @param {String} requestCombo
 * @return {Object}
 */
const extractSearchElements = (requestCombo) => {
  if (!requestCombo) {
    return {
      searchKeyword: '',
      searchFacet: '',
    };
  }

  const comboArray = requestCombo.trim().split(' more:');
  const keyword = (comboArray[0]) ? comboArray[0].trim() : '';
  const facet = (comboArray[1]) ? comboArray[1].trim() : '';

  return {
    searchKeyword: keyword,
    searchFacet: facet,
  };
};

/**
 * fetchSearchRequest(data)
 * The function gets search request, which is a combo of the search keyword and the facet,
 * such as "dog more:exhibitions"
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
 * fetchDisplayName(labelsArray, searchRequest)
 * The function returns the display name of the item.
 * An item's label object has two features: name and display name.
 * Both of them are from the category where the item belongs to.
 * In case an item has multiple name/display names,
 * it calls extractSearchElements(searchRequest) to get the present facet,
 * and then it compares the facet and all the names to get the name
 * that matches the facet.
 * Finally, it returns the display name that comes with the matched name.
 * The function takes an array and returns a string.
 *
 * @param {Array} labelsArray
 * @param {String} searchRequest
 * @return {String}
 */
const fetchDisplayName = (labelsArray, searchRequest) => {
  if (!_isArray(labelsArray) || _isEmpty(labelsArray)) {
    return '';
  }

  const displayNameArray = _map(labelsArray, (label) => {
    if (!label.displayName || !label.name) {
      return {
        name: '',
        displayName: '',
      };
    }

    return {
      name: label.name,
      displayName: label.displayName,
    };
  });

  const searchFacet = extractSearchElements(searchRequest).searchFacet;

  if (!searchFacet) {
    return displayNameArray[0].displayName;
  }

  return _filter(displayNameArray, (item) =>
    item.name === searchFacet
  )[0].displayName;
};

/**
 * fetchItemFeature(item, feature, searchRequest)
 * The function gets features from an result item.
 * The second argument indicates which feature it is going to get.
 * If the feature is "labels", it calls fetchDisplayName()
 * to get the display name of the category from the labels array.
 * The third argument is for fetchDisplayName()
 * to call extractSearchElements(searchRequest) to get the present facet.
 *
 * @param {Object} item
 * @param {String} feature
 * @param {String} SearchRequest
 * @return {String}
 */
const fetchItemFeature = (item, feature, searchRequest) => {
  if (!item.attributes[feature]) {
    return '';
  }

  if (feature === 'labels') {
    return fetchDisplayName(item.attributes[feature], searchRequest);
  }

  return item.attributes[feature];
};

/**
 * fetchItem(item, searchRequest)
 * The function gets each search result with its features.
 * All the features are under the item's attributes object,
 * so if an attribute is missing, it will pass an empty value.
 * It returns an object.
 *
 * The second argument is for fetchDisplayName()
 * to call extractSearchElements(searchRequest) to get the present facet.
 *
 * @param {Object} item
 * @param {String} SearchRequest
 * @return {Object}
 */
const fetchItem = (item, searchRequest) => {
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
    label: fetchItemFeature(item, 'labels', searchRequest),
  };
};

/**
 * fetchResultItems(data, searchRequest)
 * The function gets the search results.
 * The second argument is for fetchDisplayName()
 * to call extractSearchElements(searchRequest) to get the present facet.
 * It returns an array with each item inside.
 *
 * @param {Object} data
 * @param {String} SearchRequest
 * @return {Array}
 */
const fetchResultItems = (data, searchRequest = '') => {
  try {
    return _map(data.items, (item) => (fetchItem(item, searchRequest)));
  } catch (e) {
    console.log(e);
    return [];
  }
};

export { fetchResultLength, fetchResultItems, fetchSearchFacetsList };
