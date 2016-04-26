import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class SearchStore {
  constructor() {
    this.bindListeners({
      updateSearchData: Actions.UPDATE_SEARCH_DATA,
    });

    this.on('init', () => {
      this._searchData = [];
    });
  }

  updateSearchData(data) {
    this._searchData = data;
  }
}

export default alt.createStore(SearchStore, 'SearchStore');
