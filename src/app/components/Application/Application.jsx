import React from 'react';

// Import components
import Header from 'dgx-header-component';
import Footer from 'dgx-react-footer';
import Results from '../Results/Results.jsx';
import InputField from '../InputField/InputField.jsx';
import HintBlock from '../HintBlock/HintBlock.jsx';

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
          <div className="searchButtonWrapper">
            <div className="searchButton" onClick={this.submitSearchRequest}>
              SEARCH
            </div>
          </div>
          <div className="filterWrapper">
            <p>Filter your search:</p>
            <FilterIcon className="filterIcon" />
          </div>
          <div className="resultWrapper">
            <p>The search keyword is: {keywordHint}</p>
            <p>We got {this.state.searchDataLength} results.</p>
            <h3>the result item titles</h3>
            <Results results={this.state.searchData} />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}


class FilterIcon extends React.Component {
  render() {
    const icon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <title>filter.v3</title>
        <g>
          <circle cx="13.0944" cy="7.375" r="1.3192" />
          <circle cx="19.6222" cy="6.375" r="1.3189" />
          <circle cx="15.9997" cy="10.5242" r="1.3193" />
          <g>
            <path d="M14.1785,27.562a0.95,0.95,0,0,1-.95-0.95v-10.27L6.6875,9.2893a0.95,0.95,0,0,1,1.3956-1.29l7.0455,7.598v11.015A0.95,0.95,0,0,1,14.1785,27.562Z" />
            <path d="M18.0387,24.794a0.95,0.95,0,0,1-.95-0.95V15.603l7.126-7.8149a0.95,0.95,0,0,1,1.41,1.2744l-6.636,7.2729v7.5083A0.95,0.95,0,0,1,18.0387,24.794Z" />
          </g>
        </g>
      </svg>
    );

    return (
      <span className={this.props.className}>
        {icon}
      </span>
    );
  }
}

FilterIcon.propTypes = {
  className: React.PropTypes.string,
}

export default App;
