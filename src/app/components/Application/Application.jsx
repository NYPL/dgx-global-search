import React from 'react';

// Import components
import Header from 'dgx-header-component';
import Footer from 'dgx-react-footer';
import Results from '../Results/Results.jsx';
import InputField from '../InputField/InputField.jsx';

// Import alt components
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

    this.inputChange = this.inputChange.bind(this);
    this.submitSearchRequest = this.submitSearchRequest.bind(this);
    this.triggerSubmit = this.triggerSubmit.bind(this);
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
    const requestParameter = this.state.searchKeyword.trim();
    const requestUrl = `/search/apachesolr_search/${requestParameter}`;
    if (!requestParameter) {
      this.setState({ placeholder: 'Please enter a search term.' });
      return;
    }
    window.location.assign(requestUrl);
  }

  /**
   * triggerSubmit(event)
   * The fuction listens to the event of enter key.
   * Submit search request if enter is pressed.
   *
   * @param {Event} event
   */
  triggerSubmit(event) {
    if (event && event.charCode === 13) {
      this.submitSearchRequest();
    }
  }

  render() {
    const inputValue = this.state.searchKeyword || '';

    const keywordHint = inputValue || 'No search keyword found.';

    return (
      <div className="app-wrapper" onKeyPress={this.triggerSubmit}>
        <Header />

        <h2>NYPL Global Search</h2>
        <InputField
          type="text"
          placeholder={this.state.placeholder}
          ref="keywords"
          value={inputValue}
          onChange={this.inputChange}
        />
        <button onClick={this.submitSearchRequest}>
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
