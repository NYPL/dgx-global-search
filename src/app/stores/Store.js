import alt from 'dgx-alt-center';
import Actions from '../actions/Actions';
import filterNames from '../utils/FilterNames';

class SearchStore {
  constructor() {
    this.bindListeners({
      updateSearchKeyword: Actions.UPDATE_SEARCH_KEYWORD,
      updateSearchData: Actions.UPDATE_SEARCH_DATA,
      updateSearchDataLength: Actions.UPDATE_SEARCH_DATA_LENGTH,
      updateIsKeywordValid: Actions.UPDATE_IS_KEYWORD_VALID,
      updateSearchFacets: Actions.UPDATE_SEARCH_FACETS,
      updateSelectedFacet: Actions.UPDATE_SELECTED_FACET,
      addMoreSearchData: Actions.ADD_MORE_SEARCH_DATA,
      updateResultsStart: Actions.UPDATE_RESULTS_START,
      updateQueriesForGA: Actions.UPDATE_QUERIES_FOR_GA,
    });

    this.on('init', () => {
      this.searchKeyword = '';
      this.searchData = [];
      this.searchDataLength = '0';
      this.isKeywordValid = true;
      this.selectedFacet = '';
      this.resultsStart = 0;
      this.resultsIncrement = 10;
      this.searchFacets = filterNames;
      this.queriesForGA = {
        searchedFrom: '',
        timestamp: '',
      };
    });
  }

  updateSearchKeyword(data) {
    this.searchKeyword = data;
  }

  updateSearchData(data) {
    this.searchData = data;
  }

  updateSearchDataLength(data) {
    this.searchDataLength = data;
  }

  updateIsKeywordValid(data) {
    this.isKeywordValid = data;
  }

  updateSearchFacets(data) {
    this.searchFacets = data;
  }

  updateSelectedFacet(data) {
    this.selectedFacet = data;
  }

  addMoreSearchData(data) {
    this.searchData = this.searchData.concat(data);
  }

  updateResultsStart(data) {
    this.resultsStart = data;
  }

  updateQueriesForGA(data) {
    this.queriesForGA = data;
  }
}

export default alt.createStore(SearchStore, 'SearchStore');
