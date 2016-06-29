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

  updateIsKeywordValid(data) {
    this.dispatch(data);
  }

  updateSearchFacets(data) {
    this.dispatch(data);
  }

  updateSelectedFacet(data) {
    this.dispatch(data);
  }

  addMoreSearchData(data) {
    this.dispatch(data);
  }

}

export default alt.createActions(Actions);
