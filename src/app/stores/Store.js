import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class SearchStore {
  constructor() {
    this.bindListeners({
      updateSearchKeyword: Actions.UPDATE_SEARCH_KEYWORD,
      updateSearchData: Actions.UPDATE_SEARCH_DATA,
      updateSearchDataLength: Actions.UPDATE_SEARCH_DATA_LENGTH,
      updateSearchPlaceholder: Actions.UPDATE_SEARCH_PLACEHOLDER,
    });

    this.on('init', () => {
      this.searchKeyword = '';
      this.searchData = [];
      this.searchDataLength = 0;
      this.searchPlaceholder = 'Enter Search Terms';
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

  updateSearchPlaceholder(data) {
    this.searchPlaceholder = data;
  }
}

export default alt.createStore(SearchStore, 'SearchStore');
