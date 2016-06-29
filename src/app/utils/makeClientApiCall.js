// Import library
import axios from 'axios';
import Actions from './../actions/Actions.js';

const makeClientApiCall = (keyword, facet = '', start = 0, increment = 10) => {
  const currentSearchKeyword = keyword || '';
  const searchFilter = (facet) ? ` more:${facet}` : '';
  const requestParameter = `${currentSearchKeyword}${searchFilter}`;

  if (!keyword) {
    Actions.updateSearchKeyword('');
    Actions.updateIsKeywordValid(false);
  } else {
    axios
      .get(`/api/${requestParameter}?start=${start.toString()}`)
      .then((response) => {
        const { searchResultsItems, resultLength } = response.data;

        // The functions of Actions.js update the Store with different feature values
        Actions.updateSearchKeyword(currentSearchKeyword);
        Actions.updateSearchData(searchResultsItems);
        Actions.updateSearchDataLength(resultLength);
        Actions.updateSelectedFacet(facet);
        Actions.updateResultsStart(start + increment);
      })
      .catch(error => {
        console.log(`error calling API to search '${requestParameter}': ${error}`);
      });
  }
};

export { makeClientApiCall };
