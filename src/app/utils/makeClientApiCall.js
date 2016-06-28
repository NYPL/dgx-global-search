// Import library
import axios from 'axios';
import Actions from './../actions/Actions.js';

import { createAppHistory } from './SearchHistory.js';

// Import alt components
// import Store from '../../stores/Store.js';
// import Actions from '../../actions/Actions.js';

const history = createAppHistory();

const makeClientApiCall = (searchKeyword, facet) => {
  const currentSearchKeyword = searchKeyword || '';
  const searchFilter = (facet) ? ` more:${facet}` : '';
  const requestParameter = `${currentSearchKeyword}${searchFilter}`;

  if (!searchKeyword) {
    Actions.updateSearchKeyword('');
  } else {
    axios
      .get(`/api/${requestParameter}?start=0`)
      .then((response) => {
        const { searchKeyword, searchResultsItems, resultLength } = response.data;

        history.push({
          pathname:`/search/apachesolr_search/${currentSearchKeyword}/${facet}`,
          state: {
            keyword: currentSearchKeyword,
            filter: facet,
          },
        });

        console.log('make api call');

        // The functions of Actions.js update the Store with different feature values
        Actions.updateSearchKeyword(searchKeyword);
        Actions.updateSearchData(searchResultsItems);
        Actions.updateSearchDataLength(resultLength);
      })
      .catch(error => {
        console.log(`error calling API to search '${requestParameter}': ${error}`);
      });
  }
};

export { makeClientApiCall };