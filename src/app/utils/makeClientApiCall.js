// Import library
import axios from 'axios';
import Actions from './../actions/Actions.js';

const makeClientApiCall = (keyword, facet) => {
  const currentSearchKeyword = keyword || '';
  const searchFilter = (facet) ? ` more:${facet}` : '';
  const requestParameter = `${currentSearchKeyword}${searchFilter}`;

  if (!keyword) {
    Actions.updateSearchKeyword('');
  } else {
    axios
      .get(`/api/${requestParameter}?start=0`)
      .then((response) => {
        const { searchKeyword, searchResultsItems, resultLength } = response.data;

        // The functions of Actions.js update the Store with different feature values
        Actions.updateSearchKeyword(currentSearchKeyword);
        Actions.updateSearchData(searchResultsItems);
        Actions.updateSearchDataLength(resultLength);
        Actions.updateSelectedFacet(facet);

        // this.setState({ searchStart: 10 });
      })
      .catch(error => {
        console.log(`error calling API to search '${requestParameter}': ${error}`);
      });
  }
};

export { makeClientApiCall };
