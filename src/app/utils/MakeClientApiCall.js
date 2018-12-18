// Import library
import axios from 'axios';

/**
 * makeClientApiCall(keyword, facet, start, callbackFunction, callbackFunctionNoKeyword,
 * callbackFunctionLoading)
 * The function makes a client side API call to request the data for search results.
 * After it gets the data successfully, it executes the callback function it has passed to.
 * Generally, the callback function will serve to update Store.js with the methods of Actions.js.
 * If it is not assigned with a valid keyword, it executes the callback fucntion for no keyword.
 *
 * @param {string} keyword
 * @param {string} facet
 * @param {number} start
 * @param {function} callbackFunction
 * @param {function} callbackFunctionNoKeyword
 * @param {function} callbackFunctionLoading
 */
const makeClientApiCall = (
  keyword = '',
  facet = '',
  start = 0,
  callbackFunction = null,
  callbackFunctionNoKeyword = null,
  callbackFunctionLoading = null
) => {
  const searchFilter = (facet) ? ` more:${facet}` : '';
  const requestParameter = `${keyword}${searchFilter}`;

  if (!keyword) {
    callbackFunctionNoKeyword();
  } else {
    axios
      .get(`/search/request/api/${requestParameter}?start=${start.toString()}`)
      .then((response) => {
        const { searchResultsItems, resultLength } = response.data;

        callbackFunction(searchResultsItems, resultLength);
      })
      .catch(error => {
        console.log(`error calling API to search '${requestParameter}': ${error}`);

        if (callbackFunctionLoading) {
          callbackFunctionLoading(false);
        }
      });
  }
};

export { makeClientApiCall };
