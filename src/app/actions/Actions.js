// ACTIONS
import alt from 'dgx-alt-center';

class Actions {
  updateSearchData(data) {
    this.dispatch(data);
  }
}

export default alt.createActions(Actions);
