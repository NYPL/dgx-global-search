import React from 'react';
import { extend as _extend } from 'underscore';

// Import components
import Header from 'dgx-header-component';
import Footer from 'dgx-react-footer';
import Results from '../Results/Results.jsx';
import HintBlock from '../HintBlock/HintBlock.jsx';
import InputField from '../InputField/InputField.jsx';
import SearchButton from '../SearchButton/SearchButton.jsx';
import Filter from '../Filter/Filter.jsx';

import axios from 'axios';

// Import alt components
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = _extend(Store.getState(), { resultsComponentData: null, selectedFacet: '' });

    this.onChange = this.onChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.updateSelectedFacet = this.updateSelectedFacet.bind(this);
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
      resultsComponentData: this.renderResults(
        Store.getState().searchKeyword,
        Store.getState().searchData,
        Store.getState().searchDataLength
      ),
    });
  }

  /**
   * generateThankYouMessage()
   * Generates the message to greet users and intruct them to give feedback.
   *
   * @return {Object} object
   */
  generateThankYouMessage() {
    return (
      <p>
        <span>Thank you for beta testing the new NYPL Search.&nbsp;&nbsp; Please &nbsp;</span>
        <a className="linkText">give us your feedback</a>
        <span> to help make it even better.</span>
      </p>
    );
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
   * updateSelectedFacet(facet)
   * Set/Unset the facet with the value of the clicked facet element.
   * It compares the previous facet value and the one waiting to be updated.
   * If they are the same, which means the same element has been clicked again,
   * it will unset the facet to default value, which is none.
   *
   * @param {String} facet
   */
  updateSelectedFacet(facet) {
    if (this.state.selectedFacet === facet) {
      this.setState({ selectedFacet: '' });
    } else {
      this.setState({ selectedFacet: facet });
    }
  }

  /**
   * submitSearchRequest(value)
   * Submit the search request based on the values of the input fields.
   *
   * @param {String} value
   */
  submitSearchRequest() {
    const searchKeyword = this.state.searchKeyword.trim() || '';
    const facet = this.state.selectedFacet;
    const searchFilter = (facet) ? ` more:${facet}` : '';
    const requestParameter = `${searchKeyword}${searchFilter}`;

    if (!requestParameter) {
      this.setState({ isKeywordValid: false });
    } else {
      axios
      .get(`/api/${requestParameter}?start=0`)
      .then((response) => {
        const { searchResultsItems, resultLength } = response.data;

        // The functions of Actions.js update the Store with different feature values
        Actions.updateSearchKeyword(response.data.searchKeyword);
        Actions.updateSearchData(searchResultsItems);
        Actions.updateSearchDataLength(resultLength);
      })
      .catch(error => {
        console.log(`error calling API to search '${requestParameter}': ${error}`);
      });
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
      this.submitSearchRequest();
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
          <HintBlock
            id="gs-hintBlock"
            className="gs-hintBlock"
            message={this.generateThankYouMessage()}
          />
          <div id="gs-operations" className="gs-operations">
            <div id="gs-inputField-wrapper" className="gs-inputField-wrapper">
              <InputField
                id="gs-inputField"
                className="gs-inputField"
                type="text"
                placeholder={inputPlaceholder}
                value={inputValue}
                onChange={this.inputChange}
              />
            </div>
            <SearchButton
              id="gs-searchButton"
              className="gs-searchButton"
              label="SEARCH"
              onClick={this.submitSearchRequest}
            />
            <Filter
              id="gs-filter"
              className="gs-filter"
              facets={this.state.searchFacets}
              selectedFacet={this.state.selectedFacet}
              onClickFacet={this.updateSelectedFacet}
              onClickApply={this.submitSearchRequest}
            />
          </div>
          {this.state.resultsComponentData}
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
