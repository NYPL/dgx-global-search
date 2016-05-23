import React from 'react';

// Import components
import Header from 'dgx-header-component';
import Footer from 'dgx-react-footer';
import Results from '../Results/Results.jsx';
import HintBlock from '../HintBlock/HintBlock.jsx';
import InputField from '../InputField/InputField.jsx';
import SearchButton from '../SearchButton/SearchButton.jsx';
import Filter from '../Filter/Filter.jsx';

// Import alt components
import Store from '../../stores/Store.js';

// Import libraries
import { extend as _extend } from 'underscore';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();

    this.inputChange = this.inputChange.bind(this);
    this.submitSearchRequest = this.submitSearchRequest.bind(this);
    this.triggerSubmit = this.triggerSubmit.bind(this);
    this.renderResults = this.renderResults.bind(this);
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
  };

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
      this.setState({ searchPlaceholder: 'Please enter a search term.' });
    } else {
      const requestUrl = `/search/apachesolr_search/${requestParameter}`;

      window.location.assign(requestUrl);
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
   * If no search keyword input, it won't render anything.
   *
   * @return {Object} object
   */
  renderResults() {
    if (this.state.searchKeyword === '') {
      return;
    }

    return (
      <Results
        amount={this.state.searchDataLength}
        results={this.state.searchData}
      />
    );
  };

  render() {
    const inputValue = this.state.searchKeyword || '';

    return (
      <div className="app-wrapper" onKeyPress={this.triggerSubmit}>
        <Header skipNav={{ target: 'maincontent' }} />

        <div id="maincontent" className="maincontent" tabIndex="-1">
          <h2>NYPL Search <span>BETA</span></h2>
          <HintBlock className="hintBlock" message={this.generateThankYouMessage()} />
          <div className="inputWrapper">
            <InputField
              className="inputField"
              type="text"
              placeholder={this.state.searchPlaceholder}
              value={inputValue}
              onChange={this.inputChange}
            />
          </div>
          <SearchButton
            className="searchButton"
            label="SEARCH"
            onClick={this.submitSearchRequest}
          />
          <Filter className={"filter"} facets={this.state.searchFacets} />
          {this.renderResults()}
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
