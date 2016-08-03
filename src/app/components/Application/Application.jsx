import React from 'react';
import {
  extend as _extend,
 } from 'underscore';

// Import components
import { Header } from 'dgx-header-component';
import Footer from 'dgx-react-footer';
import Results from '../Results/Results.jsx';
import InputField from '../InputField/InputField.jsx';
import SearchButton from '../SearchButton/SearchButton.jsx';
import Filter from '../Filter/Filter.jsx';

// Import alt components
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import utilities
import { makeClientApiCall } from '../../utils/MakeClientApiCall.js';
import { createAppHistory } from '../../utils/SearchHistory.js';

const history = createAppHistory();

history.listen(location => {
  const {
    action,
    pathname,
  } = location;
  const searchKeyword = (pathname.split('/')[2]) ? pathname.split('/')[2] : '';
  const searchFacet = (pathname.split('/')[3]) ? pathname.split('/')[3] : '';
  const resultsStart = 0;

  if (action === 'POP') {
    makeClientApiCall(searchKeyword, searchFacet, resultsStart,
      (searchResultsItems, resultLength) => {
        Actions.updateSearchKeyword(searchKeyword);
        Actions.updateSearchData(searchResultsItems);
        Actions.updateSearchDataLength(resultLength);
        Actions.updateSelectedFacet(searchFacet);
        Actions.updateResultsStart(resultsStart);
      },
      () => {
        Actions.updateSearchKeyword('');
        Actions.updateIsKeywordValid(false);
      }
    );
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = _extend(
      {
        resultsComponentData: null,
      },
      Store.getState()
    );

    this.onChange = this.onChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.searchBySelectedFacet = this.searchBySelectedFacet.bind(this);
    this.submitSearchRequest = this.submitSearchRequest.bind(this);
    this.triggerSubmit = this.triggerSubmit.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  // Setting state in componentWillMount() helps us render the results for the first time before
  // the component making any client call. This is for the situation of the user get to the main
  // page with a search term
  componentWillMount() {
    this.setState({
      resultsComponentData: this.renderResults(
        Store.getState().searchKeyword,
        Store.getState().searchData,
        Store.getState().searchDataLength
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
      isKeywordValid: true,
      searchKeyword: Store.getState().searchKeyword,
      selectedFacet: Store.getState().selectedFacet,
      resultsComponentData: this.renderResults(
        Store.getState().searchKeyword,
        Store.getState().searchData,
        Store.getState().searchDataLength
      ),
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
   * @param {Event} event
   */
  inputChange(event) {
    this.setState({ searchKeyword: event.target.value });
  }

  /**
   * searchBySelectedFacet(facet)
   * Set the facet with the value of the clicked facet element.
   * It then makes an client AJAX call to fetch the results.
   *
   * @param {String} facet
   */
  searchBySelectedFacet(facet = '') {
    this.submitSearchRequest(facet);
  }

  /**
   * submitSearchRequest(selectedFacet)
   * Submit the search request based on the values of the input fields and the facet.
   *
   * @param {String} selectedFacet
   */
  submitSearchRequest(selectedFacet) {
    if (!this.state.searchKeyword) {
      this.setState({ isKeywordValid: false });
    } else {
      makeClientApiCall(this.state.searchKeyword, selectedFacet, 0,
        (searchResultsItems, resultLength) => {
          const currentSearchKeyword = this.state.searchKeyword.trim() || '';
          const facet = selectedFacet;

          // Update and transit to the match URL
          history.push({
            pathname: `/searchbeta/${currentSearchKeyword}/${facet}`,
          });

          Actions.updateSearchKeyword(currentSearchKeyword);
          Actions.updateSearchData(searchResultsItems);
          Actions.updateSearchDataLength(resultLength);
          Actions.updateSelectedFacet(facet);
          Actions.updateResultsStart(0);
        },
        () => {
          Actions.updateSearchKeyword('');
          Actions.updateIsKeywordValid(false);
        }
      );
    }
  }

  /**
   * triggerSubmit(event)
   * The function listens to the event of enter key.
   * Submit search request if enter is pressed.
   *
   * @param {Event} event
   */
  triggerSubmit(event) {
    if (event && event.charCode === 13) {
      this.submitSearchRequest(this.state.selectedFacet);
    }
  }

  /**
   * renderResults()
   * The function renders the results of the search request.
   * If no search keyword input, it won't render anything and return null.
   *
   * @return {Object} object
   */
  renderResults(searchKeyword, searchResultsArray, searchResultsLength) {
    if (!searchKeyword) {
      return null;
    }

    return (
      <Results
        amount={searchResultsLength}
        results={searchResultsArray}
        id="gs-results"
        className="gs-results"
        searchKeyword={searchKeyword}
        selectedFacet={this.state.selectedFacet}
        resultsStart={this.state.resultsStart}
      />
    );
  }

  render() {
    const inputValue = this.state.searchKeyword || '';
    const inputPlaceholder = (this.state.isKeywordValid) ?
      'Enter Search Terms' : 'Please enter a search term';

    return (
      <div id="nyplGlobalSearchApp" className="nyplGlobalSearchApp" onKeyPress={this.triggerSubmit}>
        <Header skipNav={{ target: 'gs-mainContent' }} />

        <div id="gs-mainContent" className="gs-mainContent" tabIndex="-1">
          <h2>NYPL Search <span>BETA</span></h2>
          <div id="gs-operations" className="gs-operations">
            <div id="gs-searchField" className="gs-searchField">
              <div id="gs-inputField-wrapper" className="gs-inputField-wrapper">
                <InputField
                  id="gs-inputField"
                  className="gs-inputField"
                  type="text"
                  placeholder={inputPlaceholder}
                  value={inputValue}
                  onChange={this.inputChange}
                  label="enter search terms"
                />
              </div>
              <SearchButton
                id="gs-searchButton"
                className="gs-searchButton"
                label="SEARCH"
                onClick={() => this.submitSearchRequest(this.state.selectedFacet)}
              />
            </div>
            <Filter
              id="gs-filter"
              className="gs-filter"
              facets={this.state.searchFacets}
              selectedFacet={this.state.selectedFacet}
              onClickFacet={this.searchBySelectedFacet}
            />
          </div>
          {this.state.resultsComponentData}
        </div>

        <Footer id="footer" className="footer" />
      </div>
    );
  }
}

export default App;
