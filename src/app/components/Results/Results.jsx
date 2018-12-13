import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// Import libraries
import { contains as _contains, map as _map } from 'underscore';
import { DivideLineIcon } from 'dgx-svg-icons';
import { PaginationButton } from 'dgx-react-buttons';

// Import alt components
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import components
import ResultsItem from '../ResultsItem/ResultsItem.jsx';
import TabItem from '../TabItem/TabItem.jsx';
import ReturnLink from '../ReturnLink/ReturnLink.jsx';



// Import utilities
import { makeClientApiCall } from '../../utils/MakeClientApiCall.js';
import { generateSearchedFrom, nativeGA } from '../../utils/GAUtils.js';
import getNumberForFacet from '../../utils/TabIndex.js'

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsStart: this.props.resultsStart,
      isLoadingPagination: false,
      incrementResults: 10,
      searchResults: this.props.results,
      timeToLoadResults: new Date().getTime(),
      queriesForGA: this.props.queriesForGA,
    };

    this.getList = this.getList.bind(this);
    this.addMoreResults = this.addMoreResults.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveSelectedTabValue = this.saveSelectedTabValue.bind(this);
    this.moveFocusToNextPage = this.moveFocusToNextPage.bind(this);
  }

  componentDidMount() {
    // Listen to any change of the Store
    Store.listen(this.onChange);

    const searchFrom = generateSearchedFrom(this.state.timeToLoadResults, this.state.queriesForGA);

    // Sent QuerySent event  when the result page is loaded if the search request is from
    // 'DirectLink', 'MissingTimestamp', 'MissingSearchedFrom', or 'Unknown' resource to
    // match the QuerySent and CTR event counts
    if (
      _contains(['DirectLink', 'MissingTimestamp', 'MissingSearchedFrom', 'Unknown'], searchFrom)
    ) {
      nativeGA(
        'QuerySent',
        this.props.searchKeyword,
        0,
        searchFrom,
        null,
        () => {}
      );
    }
  }

  componentWillUnmount() {
    // Stop listening to the Store
    Store.unlisten(this.onChange);
  }

  onChange() {
    // Update the Store with new fetched data
    this.setState({
      resultsStart: Store.getState().resultsStart,
      isLoadingPagination: false,
      searchResults: Store.getState().searchData,
      timeToLoadResults: new Date().getTime(),
      queriesForGA: Store.getState().queriesForGA,
    });
  }

  /**
   * getList(itemsArray)
   * The function maps the search result array,
   * and returns a new array of composed of <ResultsItem> components.
   *
   * @param {array} itemsArray
   * @return {array}
   */
  getList(itemsArray) {
    return _map(itemsArray, (item, index) => (
      <ResultsItem
        key={index}
        index={index}
        ref={`result-${index}`}
        title={item.title}
        link={this.transformHttpsToHttp(item.link)}
        snippet={this.parseSnippet(item.snippet)}
        thumbnailSrc={item.thumbnailSrc}
        label={item.label}
        className={`${this.props.className}Item`}
        isGAClickThroughClicked={this.state.isGAClickThroughClicked}
        updateGAClickThroughClicked={
          (newState) => { this.updateGAClickThroughClicked(newState); }
        }
        searchKeyword={this.props.searchKeyword}
        queriesForGA={this.state.queriesForGA}
        timeToLoadResults={this.state.timeToLoadResults}
      />
    ));
  }

  /**
   * updateGAClickThroughClicked(newState)
   * Updates isGAClickThroughClicked to true when ResultsItems are clicked once.
   * @param {Boolean} newState
   */
  updateGAClickThroughClicked(newState) {
    this.setState({ isGAClickThroughClicked: newState });
  }

  /**
   * addMoreResults()
   * The function calls makeClientApiCall() to get the result data with the new resultsStart value.
   * When it gets the response data, it adds the new results items to the exist
   * result array by Actions.addMoreSearchData().
   * Finally, it updates the resultsStart in the Store with Actions.updateResultsStart().
   */
  addMoreResults() {
    const nextResultCount = this.state.resultsStart + this.state.incrementResults;
    let originalResultsStart = this.state.resultsStart;

    makeClientApiCall(this.props.searchKeyword, this.props.selectedFacet, nextResultCount,
      (searchResultsItems) => {
        Actions.addMoreSearchData(searchResultsItems);
        Actions.updateResultsStart(nextResultCount);
        Actions.updateQueriesForGA({
          searchedFrom: this.state.queriesForGA.searchedFrom,
          timestamp: new Date().getTime(),
        });
      },
      () => {
        Actions.updateSearchKeyword('');
        Actions.updateIsKeywordValid(false);
        Actions.updateQueriesForGA({
          searchedFrom: this.state.queriesForGA.searchedFrom,
          timestamp: new Date().getTime(),
        });
      },
      // The callback function for changing the value of isLoadingPagination
      // to trigger the animation of the pagination button.
      (value) => {
        this.setState({ isLoadingPagination: value });
      }
    );

    this.moveFocusToNextPage(originalResultsStart, 0);
  }

  /**
   * moveFocusToNextPage(snippetText)
   * Move the page focus to the first item in the next page of search results.
   */
  moveFocusToNextPage(originalResultsStart, counter) {
    setTimeout(() => {
      counter += 1;
      if (originalResultsStart != this.state.resultsStart){
        const refResultIndex = `result-${this.state.resultsStart}`;
        ReactDOM.findDOMNode(this.refs[refResultIndex].refs[`${refResultIndex}-item`]).focus();
      } else if (counter < 20) {
        moveFocusToNextPage(originalResultsStart, counter);
      }
    }, 500);
  }

  /**
   * parseSnippet(snippetText)
   * The function converts a string to an array
   * if the separator pattern is found in the string.
   * If a value is found in index 1 of the array,
   * return that value else the original snippetText
   * passed.
   */
  parseSnippet(snippetText) {
    if (!snippetText && typeof snippetText !== 'string') {
      return '';
    }

    const faultyJsonArray = snippetText.trim().split('}}]]');

    if (faultyJsonArray.length > 1) {
      return faultyJsonArray[1];
    }

    return snippetText;
  }

  /**
   * transformHttpsToHttp(link)
   * The function converts certain NYPL subdomains to http
   * to prevent an error when that site does not have SSL enabled.
   */
  transformHttpsToHttp(link) {
    if (!link) {
      return;
    }

    const transformationRequired =
      link.includes('//menus.nypl.org') ||
      link.includes('//exhibitions.nypl.org') ||
      link.includes('//static.nypl.org') ||
      link.includes('//web-static.nypl.org');

    if (link && transformationRequired) {
      return link.replace('https:', 'http:');
    }

    return link;
  }

  selectedTab(tabIdValue) {
    this.setState({ tabIdValue });
  }

  saveSelectedTabValue(tabIdValue) {
    this.setState({ tabIdValue: tabIdValue });
  }

  /**
   * renderSeeMoreButton
   * The function renders a see more button,
   * unless there's no more results, instead of rendering the button,
   * it renders the suggestion text to indicate no more result.
   *
   * @return {object}
   */
  renderSeeMoreButton(remainingResults) {
    if (this.props.amount < this.state.incrementResults) {
      return null;
    }

    if (remainingResults <= 0) {
      return (
        <div className={`${this.props.id}-paginationButton-wrapper`}>
          <p>No More Results from this Search.</p>
        </div>
      );
    }
    const label = `View More Results`;
    return (
      <div className={`${this.props.id}-paginationButton-wrapper`}>
        <PaginationButton
          id={`${this.props.id}-paginationButton`}
          className={`${this.props.id}-paginationButton`}
          isLoading={this.state.isLoadingPagination}
          onClick={this.addMoreResults}
          label={label}
        />
      </div>
    );
  }

  /**
   * renderResultsNumberSuggestion(resultsLength)
   * Renders the <p> for displaying results summary.
   *
   * @param {string} resultsLength - the amount of the total result items
   * @return {HTML Element} p
   */
  renderResultsNumberSuggestion(resultsLength) {
    let resultsNumberSuggestion;
    const textOfResult = this.props.amount === 1 ? 'result' : 'results';
    const resultMessageClass = (resultsLength === 0) ?
      'noResultMessage' : `${this.props.className}-length`;

    if (!this.props.searchKeyword) {
      resultsNumberSuggestion = '';
    } else {
      resultsNumberSuggestion = (resultsLength === 0) ?
        'No results were found' :
        `Found about ${this.props.amount.toLocaleString()} ${textOfResult} for ` +
        `"${this.props.searchKeyword}"`;
    }

    if (this.props.selectedFacet && Array.isArray(this.props.tabs)) {
      const tabArray = this.props.tabs;
      let selectedTabName = '';

      tabArray.forEach((tab) => {
        if (tab.label === this.props.selectedFacet) {
          selectedTabName = tab.resultSummarydisplayName;
        }
      });

      resultsNumberSuggestion ? resultsNumberSuggestion += ` in ${selectedTabName}` : null;
    }

    return (
      <p
        id="search-results-summary"
        className={resultMessageClass}
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="all"
        // Assigns the key to the element for telling React that this element should be re-rendered
        // every time when making a search request, even if the final result is
        // the same as previous. Therefore, aria-live can be picked up by screen readers.
        key={this.state.timeToLoadResults}
      >
        {resultsNumberSuggestion}
      </p>
    );
  }

  render() {
    const results = this.getList(this.state.searchResults);
    const inputValue = this.props.searchKeyword || '';

    return (
      <div className={`${this.props.className}-wrapper`}>
        {this.renderResultsNumberSuggestion(results.length)}
        <TabItem
          id="gs-tabs"
          tabs={this.props.tabs}
          selectedFacet={this.props.selectedFacet}
          searchBySelectedFacetFunction={this.props.searchBySelectedFacetFunction}
          saveSelectedTabValue={this.saveSelectedTabValue}
        />
        {typeof results.length !== 'undefined' && results.length !== 0 ? (
          <div>
            <div className="clear-float" />
            <DivideLineIcon
              ariaHidden
              className={`${this.props.className}-divideLineIcon`}
              height="4"
              length="84"
              stroke="#2799C5"
              strokeWidth="4"
              title="divide.line.icon.svg"
              viewBox="0 0 84 4"
              width="84"
            />
          <ol id={this.props.id} className={this.props.className} ref="resultsOlElement" tabIndex="0" aria-labelledby={`link${getNumberForFacet(this.props.selectedFacet)}`}>
              {results}
            </ol>
            {
              results.length % 10 === 0 &&
              this.renderSeeMoreButton(Math.min(this.props.amount - results.length, 10))
            }
            <ReturnLink linkRoot="/search/apachesolr_search/" inputValue={inputValue} />
          </div>
        ) : null}
      </div>
    );
  }
}

Results.propTypes = {
  lang: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  results: PropTypes.array,
  amount: PropTypes.number,
  searchKeyword: PropTypes.string,
  resultsStart: PropTypes.number,
  selectedFacet: PropTypes.string,
  queriesForGA: PropTypes.object,
  selectedTab: PropTypes.string,
  tabs: PropTypes.array,
  searchBySelectedFacetFunction: PropTypes.func,
};

Results.defaultProps = {
  lang: 'en',
  id: 'results',
  className: 'results',
  results: [],
  amount: 0,
  searchKeyword: '',
  resultsStart: 0,
  selectedFacet: '',
  queriesForGA: {},
};

export default Results;
