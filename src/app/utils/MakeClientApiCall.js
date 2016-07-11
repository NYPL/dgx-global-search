// Import library
import axios from 'axios';

/**
 * makeClientApiCall(keyword, facet, start, callbackFunction, callbackFunctionNoKeyword)
 * The function makes a client side API call to request the data for search results.
 * After it gets the data successfully, it executes the callback function it has passed to.
 * Generally, the callback function will serve to update Store.js with the methods of Actions.js. 
 * If it is not assigned with a valid keyword, it executes the callback fucntion for no keyword.
 *
 * @param {String} keyword
 * @param {String} facet
 * @param {Number} start
 * @param {Function} callbackFunction
 * @param {Function} callbackFunctionNoKeyword
 */
const makeClientApiCall =
  (keyword = '', facet = '', start = 0, callbackFunction, callbackFunctionNoKeyword) => {
    const searchFilter = (facet) ? ` more:${facet}` : '';
    const requestParameter = `${keyword}${searchFilter}`;

    if (!keyword) {
      callbackFunctionNoKeyword();
    } else {
      axios
        .get(`/api/${requestParameter}?start=${start.toString()}`)
        .then((response) => {
          const { searchResultsItems, resultLength } = response.data;

          callbackFunction(searchResultsItems, resultLength);
        })
        .catch(error => {
          console.log(`error calling API to search '${requestParameter}': ${error}`);
        });
    }
  };

export { makeClientApiCall };
