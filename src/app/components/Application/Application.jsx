import React from 'react';
import {
  extend as _extend,
} from 'underscore';

// Import components
import { Header, navConfig } from '@nypl/dgx-header-component';
import Footer from '@nypl/dgx-react-footer';
import Results from '../Results/Results';
import InputField from '../InputField/InputField';
import SearchButton from '../SearchButton/SearchButton';
import TabItem from '../TabItem/TabItem';
import ResultsNumberSuggestion from '../ResultsNumberSuggestion/ResultsNumberSuggestion';

// Import alt components
import Store from '../../stores/Store';
import Actions from '../../actions/Actions';

// Import utilities
import searchApiCaller from '../../utils/SearchApiCaller';
import { createAppHistory } from '../../utils/SearchHistory';
import { nativeGA } from '../../utils/GAUtils';

const history = createAppHistory();

history.listen((location) => {
  const {
    action,
    pathname,
  } = location;
  const searchKeyword = pathname.split('/')[2] || '';
  const searchFacet = pathname.split('/')[3] || '';
  const resultsStart = 0;

  if (action === 'POP') {
    searchApiCaller.makeClientApiCall(
      searchKeyword,
      searchFacet,
      resultsStart,
      (searchResultsItems, resultLength) => {
        Actions.updateSearchKeyword(searchKeyword);
        Actions.updateIsKeywordValid(true);
        Actions.updateSearchData(searchResultsItems);
        Actions.updateSearchDataLength(resultLength);
        Actions.updateSelectedFacet(searchFacet);
        Actions.updateResultsStart(resultsStart);
        Actions.updateQueriesForGA({
          searchedFrom: 'betasearch',
          timestamp: new Date().getTime(),
        });
      },
      () => {
        Actions.updateSearchKeyword('');
        Actions.updateIsKeywordValid(true);
        Actions.updateQueriesForGA({
          searchedFrom: 'betasearch',
          timestamp: new Date().getTime(),
        });
      },
    );
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = _extend(
      {
        resultsComponentData: null,
        isGAQuerySent: false,
      },
      Store.getState(),
    );

    this.suggestion = [];

    this.onChange = this.onChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.submitSearchRequest = this.submitSearchRequest.bind(this);
    this.triggerSubmit = this.triggerSubmit.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.searchBySelectedFacet = this.searchBySelectedFacet.bind(this);
  }

  // Setting state in componentWillMount() helps us render the results for the first time before
  // the component making any client call. This is for the situation of the user who gets to the
  // main page with a search term
  componentWillMount() {
    this.setState({
      resultsComponentData: this.renderResults(
        Store.getState().searchKeyword,
        Store.getState().searchData,
        Store.getState().searchDataLength,
        Store.getState().isKeywordValid,
      ),
    });
  }

  componentDidMount() {
    // Listen to any change of the Store
    Store.listen(this.onChange);
  }

  componentWillUnmount() {
    // Stop listening to the Store
    Store.unlisten(this.onChange);
  }

  onChange() {
    // Updates the state with the new search data
    this.setState({
      searchKeyword: Store.getState().searchKeyword,
      selectedFacet: Store.getState().selectedFacet,
      resultsComponentData: this.renderResults(
        Store.getState().searchKeyword,
        Store.getState().searchData,
        Store.getState().searchDataLength,
        Store.getState().isKeywordValid,
      ),
      queriesForGA: Store.getState().queriesForGA,
    });
  }

  /**
   * inputChange(event)
   * Listen to the changes on keywords input field.
   * Grab the event value, and change the state.
   * The parameter indicates which input field has been changed.
   * Passng event as the argument here as FireFox doesn't accept event
   * as a global variable.
   *
   * @param {object} event
   */
  inputChange(event) {
    this.setState({ searchKeyword: event.target.value });
  }

  /**
   * searchBySelectedFacet()
   * Set the facet with the value of the clicked facet element.
   * It then makes an client AJAX call to fetch the results.
   *
   */
  searchBySelectedFacet(selectedFacet = '') {
    this.triggerGAThenSubmit(selectedFacet);
  }

  /**
   * submitSearchRequest(selectedFacet)
   * Submit the search request based on the values of the input fields and the facet.
   *
   * @param {string} selectedFacet
   */
  submitSearchRequest(selectedFacet = '') {
    const {
      searchKeyword,
    } = this.state;

    if (!searchKeyword) {
      Actions.updateSelectedFacet(selectedFacet);
      Actions.updateIsKeywordValid(false);
      Actions.updateSearchKeyword('');
      Actions.updateSearchData([]);
    } else {
      searchApiCaller.makeClientApiCall(
        searchKeyword,
        selectedFacet,
        0,
        (searchResultsItems, resultLength) => {
          const currentSearchKeyword = searchKeyword.trim() || '';
          const facet = selectedFacet;

          // Update and transit to the match URL
          history.push({
            pathname: `/search/${currentSearchKeyword}/${facet}`,
          });

          Actions.updateSearchKeyword(currentSearchKeyword);
          Actions.updateIsKeywordValid(true);
          Actions.updateSearchData(searchResultsItems);
          Actions.updateSearchDataLength(resultLength);
          Actions.updateSelectedFacet(facet);
          Actions.updateResultsStart(0);
          Actions.updateQueriesForGA({
            searchedFrom: 'betasearch',
            timestamp: new Date().getTime(),
          });
        },
        () => {
          Actions.updateSearchKeyword('');
          Actions.updateIsKeywordValid(true);
          Actions.updateQueriesForGA({
            searchedFrom: 'betasearch',
            timestamp: new Date().getTime(),
          });
        },
      );
    }
  }

  /**
   * triggerSubmit(event)
   * The function listens to the event of enter key.
   * Submit search request if enter is pressed.
   *
   * @param {object} event
   */
  triggerSubmit(event) {
    const {
      selectedFacet,
    } = this.state;

    if (event) {
      if (event.keyCode === 13 || event.key === 'Enter') {
        this.triggerGAThenSubmit(selectedFacet);
      }
    }
  }

  /**
   * triggerGAThenSubmit(selectedFacet = '')
   * The function sends a GA QuerySent event if a patron clicks the search button or the filter
   * apply button. Then in its callback function, it triggers the function to submit the search
   * request.
   *
   * @param {string} selectedFacet
   */
  triggerGAThenSubmit(selectedFacet = '') {
    const {
      searchKeyword,
      isGAQuerySent,
    } = this.state;

    // Only trigger search and GA QuerySent event one time if double or tripple clicks happen
    if (!isGAQuerySent) {
      // Set isGAQuerySent to be true to avoid another event being sent in a short period of time
      this.setState({ isGAQuerySent: true });
      nativeGA(
        'QuerySent',
        searchKeyword,
        0,
        'BetaSearchForm',
        null,
        () => {
          // Set isGAQuerySent back to default to accept another event
          // as we don't reload the page after a search request
          setTimeout(() => { this.setState({ isGAQuerySent: false }); }, 200);
          this.submitSearchRequest(selectedFacet);
        },
      );
    }
  }


  /**
   * renderResults(searchKeyword, searchResultsArray, searchResultsLength, isKeywordValid)
   * The function renders the results of the search request.
   * If no search keyword input, it won't render anything and return null.
   *
   * @param {string} searchKeyword
   * @param {array} searchResultsArray
   * @param {number} searchResultsLength
   * @param {boolean} isKeywordValid
   * @return {object} object
   */
  renderResults(searchKeyword, searchResultsArray, searchResultsLength, isKeywordValid) {
    const {
      tabIdValue,
      searchFacets,
      selectedFacet,
      resultsStart,
      queriesForGA,
    } = this.state;

    return (
      <Results
        selectedTab={tabIdValue}
        amount={searchResultsLength}
        results={searchResultsArray}
        id="gs-results"
        className="gs-results"
        searchKeyword={searchKeyword}
        tabs={searchFacets}
        selectedFacet={selectedFacet}
        resultsStart={resultsStart}
        queriesForGA={queriesForGA}
        searchBySelectedFacetFunction={this.searchBySelectedFacet}
        isKeywordValid={isKeywordValid}
        suggestion={this.suggestion}
      />
    );
  }

  render() {
    const {
      resultsComponentData,
      searchKeyword,
      selectedFacet,
      searchFacets,
    } = this.state;
    const inputValue = searchKeyword || '';
    const inputPlaceholder = 'What would you like to find?';
    console.log(302)

    return (
      <div id="nyplGlobalSearchApp" className="nyplGlobalSearchApp">
        <Header navData={navConfig.current} skipNav={{ target: 'gs-mainContent' }} />
        <main id="gs-mainContent" tabIndex="-1">
          <div className="gs-header">
            <div className="gs-mainContent" aria-label="NYPL Site Search" role="search">
              <h1>NYPL.org Search</h1>
              <div id="gs-operations" className="gs-operations">
                <div id="gs-searchField" className="gs-searchField">
                  <div id="gs-inputField-wrapper" className="gs-inputField-wrapper">
                    <label htmlFor="gs-inputField" className="visuallyHidden">Search NYPL.org</label>
                    <InputField
                      id="gs-inputField"
                      className="gs-inputField"
                      type="text"
                      placeholder={inputPlaceholder}
                      value={inputValue}
                      onKeyPress={this.triggerSubmit}
                      onChange={this.inputChange}
                      label="NYPL Site Search"
                    />
                  </div>
                  <SearchButton
                    id="gs-searchButton"
                    className="gs-searchButton"
                    label="SEARCH"
                    onClick={() => this.triggerGAThenSubmit(selectedFacet)}
                  />
                </div>
                <div className="gs-search-catalog-link-wrapper">
                  <a
                    className="gs-search-catalog-link"
                    href={
                      `https://browse.nypl.org/iii/encore/search/C__S${searchKeyword}__`
                      + 'Orightresult__U?lang=eng&suite=def'
                    }
                  >
                    {'Find books, music, or movies instead >'}
                  </a>
                </div>
              </div>
                <ResultsNumberSuggestion
                  ref={(input) => { console.log('input', input); if (input) { this.suggestion[0] = input; } }}
                />
              <div className="gs-results-wrapper">
                <TabItem
                  id="gs-tabs"
                  tabs={searchFacets}
                  selectedFacet={selectedFacet}
                  searchBySelectedFacetFunction={this.searchBySelectedFacetFunction}
                />
              </div>
            </div>
          </div>
            {resultsComponentData}
        </main>
        <Footer id="footer" className="footer" />
      </div>
    );
  }
}

export default App;
