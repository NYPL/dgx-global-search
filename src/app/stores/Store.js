import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class SearchStore {
  constructor() {
    this.bindListeners({
      updateSearchData: Actions.UPDATE_SEARCH_DATA,
    });

    this.on('init', () => {
      this.searchData = undefined;
    });
  }

  updateSearchData(data) {
    this.searchData = data;
  }
}

export default alt.createStore(SearchStore, 'SearchStore');
