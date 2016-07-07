// Import library
import axios from 'axios';

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
