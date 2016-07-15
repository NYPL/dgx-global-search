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
    {
      anchor: 'Help',
      label: 'help',
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
  const searchKeyword = (comboArray[0]) ? comboArray[0].trim() : '';
  const searchFacet = (comboArray[1]) ? comboArray[1].trim() : '';

  return {
    searchKeyword,
    searchFacet,
  };
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

  const displayName = _find(displayNameArray, (item) =>
    item.name === searchFacet
  ).displayName;

  return displayName || '';
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
  if (!item.attributes[feature]) {
    return '';
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

  const modeledTitle = stripPossibleHTMLTag(fetchItemFeature(item, 'title'));
  const modeledSnippet = stripPossibleHTMLTag(fetchItemFeature(item, 'snippet'));

  return {
    title: modeledTitle,
    link: fetchItemFeature(item, 'link'),
    snippet: modeledSnippet,
    thumbnailSrc: fetchItemFeature(item, 'thumbnail-url'),
    label: fetchDisplayName(item.attributes.labels, searchRequest),
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
