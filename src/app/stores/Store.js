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
      updateSelectedFacet: Actions.UPDATE_SELECTED_FACET,
      addMoreSearchData: Actions.ADD_MORE_SEARCH_DATA,
      updateResultsStart: Actions.UPDATE_RESULTS_START,
      updateQueriesForGA: Actions.UPDATE_QUERIES_FOR_GA,
    });

    this.on('init', () => {
      this.searchKeyword = '';
      this.searchData = [];
      this.searchDataLength = 0;
      this.isKeywordValid = true;
      this.selectedFacet = '';
      this.resultsStart = 0;
      this.resultsIncrement = 10;
      this.searchFacets = [
        {
          anchor: 'All Results',
          value: '',
          label: 'all_results',
        },
        {
          anchor: 'Research Guides',
          value: 'research_guides',
          label: 'research_guides',
        },
        {
          anchor: 'Exhibitions',
          value: 'exhibitions',
          label: 'exhibitions',
        },
        {
          anchor: 'Audio / Visual',
          value: 'audio_video',
          label: 'audio_video',
        },
        {
          anchor: 'Blog',
          value: 'blog_posts',
          label: 'blog_posts',
        },
        {
          anchor: 'Events / Classes',
          value: 'events_classes',
          label: 'events_classes',
        },
        {
          anchor: 'Help',
          value: 'help_articles',
          label: 'help_articles',
        },
        {
          anchor: 'Articles',
          value: 'articles_databases',
          label: 'articles_databases',
        },
      ];
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
