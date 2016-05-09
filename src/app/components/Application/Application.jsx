import React from 'react';

import Header from 'dgx-header-component';
import Footer from 'dgx-react-footer';
import Results from '../Results/Results.jsx';
import InputField from '../InputField/InputField.jsx';

import Store from '../../stores/Store.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: Store.getState().searchKeyword,
      placeholder: 'What would you like to find?',
      searchResults: Store.getState(),
      searchDataLength: Store.getState().searchDataLength,
    };

    this._inputChange = this._inputChange.bind(this);
    this._submitSearchRequest = this._submitSearchRequest.bind(this);
    this._triggerSubmit = this._triggerSubmit.bind(this);
  }

  /**
   * _inputChange(event)
   * Listen to the changes on keywords input field.
   * Grab the event value, and change the state.
   * The parameter indicates which input field has been changed.
   * Passng event as the argument here as FireFox doesn't accept event
   * as a global variable.
   *
   * @param {Event} event
   */
  _inputChange(event) {
    this.setState({ searchKeyword: event.target.value });
  }

  /**
   * _submitSearchRequest(value)
   * Submit the search request based on the values of the input fields.
   *
   * @param {String} value
   */
  _submitSearchRequest() {
    const requestParameter = this.state.searchKeyword.trim();
    const requestUrl = `/search/apachesolr_search/${requestParameter}`;
    if (!requestParameter) {
      this.setState({ placeholder: 'Please enter a search term.' });
      return;
    }
    window.location.assign(requestUrl);
  }

  /**
   * _triggerSubmit(event)
   * The fuction listens to the event of enter key.
   * Submit search request if enter is pressed.
   *
   * @param {Event} event
   */
  _triggerSubmit(event) {
    if (event && event.charCode === 13) {
      this._submitSearchRequest(null);
    }
  }


  render() {
    const inputValue = (this.state.searchKeyword === '') ?
      '' : this.state.searchKeyword;

    const keywordHint = inputValue || 'No search keyword found.';

    return (
      <div className="app-wrapper" onKeyPress={this._triggerSubmit}>
        <Header />

        <h2>NYPL Global Search</h2>
        <InputField
          type="text"
          placeholder={this.state.placeholder}
          ref="keywords"
          value={inputValue}
          onChange={this._inputChange.bind(this)}
        />
        <button onClick={this._submitSearchRequest.bind(this)}>
          SUBMIT
        </button>
        <h2>Search Results</h2>
        <p>The search keyword is: {keywordHint}</p>
        <p>We got {this.state.searchDataLength} results.</p>
        <h3>the result item titles</h3>
        <Results results={this.state.searchResults.searchData} />

        <Footer />
      </div>
    );
  }
}

export default App;
