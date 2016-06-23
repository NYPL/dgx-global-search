// Import library
import axios from 'axios';

import { createAppHistory } from './SearchHistory.js';

// Import alt components
// import Store from '../../stores/Store.js';
// import Actions from '../../actions/Actions.js';

const history = createAppHistory();

const makeClientApiCall = (searchKeyword, facet) => {
  const currentSearchKeyword = searchKeyword || '';
  // const facet = selectedFacet;
  const searchFilter = (facet) ? ` more:${facet}` : '';
  const requestParameter = `${currentSearchKeyword}${searchFilter}`;

  // if (!currentSearchKeyword) {
  //   this.setState({ isKeywordValid: false });
  // } else {
    axios
    .get(`/api/${requestParameter}?start=0`)
    .then((response) => {
      const { searchKeyword, searchResultsItems, resultLength } = response.data;

      history.push(`/search/apachesolr_search/${currentSearchKeyword}/${facet}`);

      // The functions of Actions.js update the Store with different feature values
      // Actions.updateSearchKeyword(searchKeyword);
      // Actions.updateSearchData(searchResultsItems);
      // Actions.updateSearchDataLength(resultLength);

      return response.data;
    })
    .catch(error => {
      console.log(`error calling API to search '${requestParameter}': ${error}`);
    });
  // }
};

export { makeClientApiCall };