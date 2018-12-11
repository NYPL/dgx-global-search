import { filterNames } from './FilterNames.js';

// Import libraries
import {
  map as _map,
  isArray as _isArray,
  isEmpty as _isEmpty,
  find as _find,
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
      searchInformation: {
        formattedTotalResults: totalResults = 0,
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
const fetchSearchFacetsList = () => {
  return filterNames;
}

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
  const searchKeyword = (comboArray[0]) ? comboArray[0].trim() : '';
  const searchFacet = (comboArray[1]) ? comboArray[1].trim() : '';

  return {
    searchKeyword,
    searchFacet,
  };
};

const displayName = (name) => name.split("_").map(word => word ? word[0].toUpperCase() + word.slice(1) : '').join(" ")

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
  let name;

  if (!_isArray(labelsArray) || _isEmpty(labelsArray)) {
    return '';
  }

  const displayNameArray = _map(labelsArray, (label) => {
    return {
      name: label.name || '',
    };
  });

  const searchFacet = extractSearchElements(searchRequest).searchFacet;

  if (!searchFacet) {
    name = displayNameArray[0].name;
  } else {
    name = _find(displayNameArray, (item) =>
      item.name === searchFacet
    ).name;
  }

  return displayName(name || '');
};

/**
 * stripPossibleHTMLTag(string)
 * The function strips the possible HTML tags in a string.
 * It replaces all the sections of texts in the input that start with "<" ("&lt;" in HTML name)
 * and end with ">" ("&gt;" in HTML name) with "".
 * It then returns a new modified string.
 * The reason to have the function is to get rid of unwanted HTML tags in the contents
 * and also the default styles come along with them.
 *
 * Regex explanation: To pick up any text section between "&lt;" and the first "&gt;" it encounters.
 * Then to remove the possible open HTML tag in the end, such as "</div".
 *
 * @param {String} string
 * @return {String}
 */
const stripPossibleHTMLTag = (string) =>
  string.replace(/&lt;[^(&gt;)]+?&gt;/g, '').replace(/&lt;.*/, '');


/**
 * secureHttpsProtocol(url)
 * The function gets the urls that begin with http and converts them to begin with https.
 *
 * @param {String} string
 * @return {String}
 */
const secureHttpsProtocol = (url) =>
  url.replace(/^http:\/\//i, 'https://');

/**
 * fetchItemFeature(item, feature)
 * The function gets the features, except label, from an result item.
 * The second argument indicates which feature it is going to get.
 *
 * @param {Object} item
 * @param {String} feature
 * @param {String} SearchRequest
 * @return {String}
 */
const fetchItemFeature = (item, feature) => {
  return item[feature] || '';
};

const getNestedData = (array, item) => {
  return array.reduce((acc, el) => (acc[el] || ''), item)
}

const logThumbnail = (item) => {
  let thumbnails = getNestedData(['pagemap', 'cse_thumbnail'], item);
  if (thumbnails.length && thumbnails.length > 1) {
    console.log('item with multiple thumbnails: ', JSON.stringify(item));
  }
}

const fetchThumbnail = (item) => {
  logThumbnail(item);
  return getNestedData(['pagemap', 'cse_thumbnail', 0, 'src'], item)
}

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
  if (!item) {
    return {
      title: '',
      link: '',
      snippet: '',
      thumbnailSrc: '',
      label: '',
    };
  }

  const modeledTitle = stripPossibleHTMLTag(fetchItemFeature(item, 'title'));
  const modeledSnippet = stripPossibleHTMLTag(fetchItemFeature(item, 'snippet'));

  return {
    title: modeledTitle,
    link: secureHttpsProtocol(fetchItemFeature(item, 'link')),
    snippet: modeledSnippet,
    thumbnailSrc: fetchThumbnail(item),
    label: fetchDisplayName(item.labels, searchRequest),
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
