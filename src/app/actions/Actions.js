// ACTIONS
import alt from 'dgx-alt-center';

class Actions {
  updateSearchKeyword(data) {
    this.dispatch(data);
  }

  updateSearchData(data) {
    this.dispatch(data);
  }

  updateSearchDataLength(data) {
    this.dispatch(data);
  }

   updateSearchPlaceholder(data) {
    this.dispatch(data);
  }
}

export default alt.createActions(Actions);
