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

    this.state = _extend(Store.getState(),
      { placeholder: 'Enter Search Terms' }
    );

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
    const requestParameter = this.state.searchKeyword.trim() || '';

    if (!requestParameter) {
      this.setState({ placeholder: 'Please enter a search term.' });
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

  render() {
    const inputValue = this.state.searchKeyword || '';
    const keywordHint = inputValue || 'No search keyword found.';
    const thankYouMessage = 'Thank you for beta testing the new NYPL Search. Please give us your ' +
      'feedback to help make it even better.';

    return (
      <div className="app-wrapper" onKeyPress={this.triggerSubmit}>
        <Header skipNav={{ target: 'maincontent' }} />

        <div id="maincontent" className="maincontent" tabIndex="-1">
          <h2>NYPL Search <span>BETA</span></h2>
          <HintBlock className="hintblock" message={thankYouMessage} />
          <div className="inputWrapper">
            <InputField
              className="inputField"
              type="text"
              placeholder={this.state.placeholder}
              ref="keywords"
              value={inputValue}
              onChange={this.inputChange}
            />
          </div>
          <SearchButton className="searchButton" onClick={this.submitSearchRequest} />
          <Filter className={"filter"} />
          <Results
            amount={this.state.searchDataLength}
            results={this.state.searchData}
          />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
