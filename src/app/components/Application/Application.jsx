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

import {
  fetchResultLength,
  fetchResultItems,
  fetchSearchKeyword,
} from './../../utils/SearchModel.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    _extend(this.state, { resultsComponentData: null });

    this.inputChange = this.inputChange.bind(this);
    this.submitSearchRequest = this.submitSearchRequest.bind(this);
    this.triggerSubmit = this.triggerSubmit.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  componentWillMount() {
    this.setState({
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
   * submitSearchRequest(value)
   * Submit the search request based on the values of the input fields.
   *
   * @param {String} value
   */
  submitSearchRequest() {
    const requestParameter = this.state.searchKeyword.trim() || '';

    if (!requestParameter) {
      this.setState({ isKeywordValid: false });
    } else {
      axios.get(`/api/${requestParameter}?start=0`)
      .then((response) => {
        // The fucntions of Actions.js update the Store with different feature values
        Actions.updateSearchKeyword(fetchSearchKeyword(response.data));
        Actions.updateSearchData(fetchResultItems(response.data));
        Actions.updateSearchDataLength(fetchResultLength(response.data));

        // Updates the state with the new search data
        this.setState({
          isKeywordValid: true,
          resultsComponentData: this.renderResults(
            Store.getState().searchKeyword,
            Store.getState().searchData,
            Store.getState().searchDataLength
          ),
        });
      })
      .catch(error => {
        console.log(`error calling API to search '${requestParameter}': ${error}`);
        console.log(error.data.errors[0].title);
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
    if (this.state.searchKeyword === '') {
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
            <Filter id="gs-filter" className="gs-filter" facets={this.state.searchFacets} />
          </div>
          {this.state.resultsComponentData}
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
