import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class SearchStore {
  constructor() {
    this.bindListeners({
      updateSearchKeyword: Actions.UPDATE_SEARCH_KEYWORD,
      updateSearchData: Actions.UPDATE_SEARCH_DATA,
      updateSearchDataLength: Actions.UPDATE_SEARCH_DATA_LENGTH,
      updateIsKeywordValid: Actions.UPDATE_IS_KEYWORD_VALID,
      updateSearchFacets: Actions.UPDATE_SEARCH_FACETS,
      addMoreSearchData: Actions.ADD_MORE_SEARCH_DATA,
    });

    this.on('init', () => {
      this.searchKeyword = '';
      this.searchData = [];
      this.searchDataLength = 0;
      this.isKeywordValid = true;
      this.searchFacets = [
        {
          anchor: 'All',
          label: '',
        },
        {
          anchor: 'Digital Collections',
          label: 'digital_collections',
        },
        {
          anchor: 'Exhibitions',
          label: 'exhibitions',
        },
        {
          anchor: 'Archives',
          label: 'archives',
        },
        {
          anchor: 'Audio / Visual',
          label: 'audio_video',
        },
        {
          anchor: 'Blog',
          label: 'blog',
        },
        {
          anchor: 'Projects',
          label: 'projects',
        },
        {
          anchor: 'Events / Classes',
          label: 'events_classes',
        },
        {
          anchor: 'Recommendations',
          label: 'recommendations'
        },
        {
          anchor: 'Locations',
          label: 'locations',
        },
      ];
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

  addMoreSearchData(data) {
    this.searchData = this.searchData.concat(data);
  }
}

export default alt.createStore(SearchStore, 'SearchStore');
