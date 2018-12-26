import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// Import libraries
import { contains as _contains, map as _map } from 'underscore';
import { DivideLineIcon, DownWedgeIcon } from '@nypl/dgx-svg-icons';
import { BasicButton } from 'dgx-react-buttons';

// Import alt components
import Store from '../../stores/Store';
import Actions from '../../actions/Actions';

// Import components
import ResultsItem from '../ResultsItem/ResultsItem';
import TabItem from '../TabItem/TabItem';
import ReturnLink from '../ReturnLink/ReturnLink';


// Import utilities
import { makeClientApiCall } from '../../utils/MakeClientApiCall';
import { generateSearchedFrom, nativeGA } from '../../utils/GAUtils';
import { displayNameForFacet } from '../../utils/TabIndex';

class Results extends React.Component {
  constructor(props) {
    super(props);

    const {
      resultsStart,
      results,
      queriesForGA,
    } = this.props;

    this.state = {
      resultsStart,
      isLoadingPagination: false,
      incrementResults: 10,
      searchResults: results,
      timeToLoadResults: new Date().getTime(),
      queriesForGA,
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

    const {
      queriesForGA,
      timeToLoadResults,
    } = this.state;

    const {
      searchKeyword,
    } = this.props;

    const searchFrom = generateSearchedFrom(timeToLoadResults, queriesForGA);

    // Sent QuerySent event  when the result page is loaded if the search request is from
    // 'DirectLink', 'MissingTimestamp', 'MissingSearchedFrom', or 'Unknown' resource to
    // match the QuerySent and CTR event counts
    if (
      _contains(['DirectLink', 'MissingTimestamp', 'MissingSearchedFrom', 'Unknown'], searchFrom)
    ) {
      nativeGA(
        'QuerySent',
        searchKeyword,
        0,
        searchFrom,
        null,
        () => {},
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
    const {
      className,
      searchKeyword,
    } = this.props;

    const {
      isGAClickThroughClicked,
      queriesForGA,
      timeToLoadResults,
    } = this.state;

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
        className={`${className}Item`}
        isGAClickThroughClicked={isGAClickThroughClicked}
        updateGAClickThroughClicked={
          (newState) => { this.updateGAClickThroughClicked(newState); }
        }
        searchKeyword={searchKeyword}
        queriesForGA={queriesForGA}
        timeToLoadResults={timeToLoadResults}
      />
    ));
  }

  /**
   * moveFocusToNextPage(originalResultsStart, counter)
   * Move the page focus to the first item in the next page of search results.
   * @param {Number} numResultsOnPage
   * @param {Number} counter
   */
  moveFocusToNextPage(numResultsOnPage, counter) {
    const {
      resultsStart,
    } = this.state;
    setTimeout(() => {
      const updatedCounter = counter + 1;
      if (numResultsOnPage !== resultsStart) {
        const refResultIndex = `result-${resultsStart}`;
        ReactDOM.findDOMNode(this.refs[refResultIndex].refs[`${refResultIndex}-item`]).focus();
      } else if (counter < 20) {
        this.moveFocusToNextPage(numResultsOnPage, updatedCounter);
      }
    }, 500);
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
    const {
      incrementResults,
      queriesForGA,
      resultsStart,
    } = this.state;

    const {
      searchKeyword,
      selectedFacet,
    } = this.props;

    const nextResultCount = resultsStart + incrementResults;
    const originalResultsStart = resultsStart;

    makeClientApiCall(searchKeyword, selectedFacet, nextResultCount,
      (searchResultsItems) => {
        Actions.addMoreSearchData(searchResultsItems);
        Actions.updateResultsStart(nextResultCount);
        Actions.updateQueriesForGA({
          searchedFrom: queriesForGA.searchedFrom,
          timestamp: new Date().getTime(),
        });
      },
      () => {
        Actions.updateSearchKeyword('');
        Actions.updateIsKeywordValid(false);
        Actions.updateQueriesForGA({
          searchedFrom: queriesForGA.searchedFrom,
          timestamp: new Date().getTime(),
        });
      },
      // The callback function for changing the value of isLoadingPagination
      // to trigger the animation of the pagination button.
      (value) => {
        this.setState({ isLoadingPagination: value });
      });

    this.moveFocusToNextPage(originalResultsStart, 0);
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
      return '';
    }

    const transformationRequired = link.includes('//digital.nypl.org')
      || link.includes('//menus.nypl.org')
      || link.includes('//exhibitions.nypl.org')
      || link.includes('//static.nypl.org')
      || link.includes('//static.nypl.org/exhibitions')
      || link.includes('//web-static.nypl.org/exhibitions')
      || link.includes('//web-static.nypl.org');

    if (link && transformationRequired) {
      return link.replace('https:', 'http:');
    }

    return link;
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
    const {
      amount,
      id,
    } = this.props;

    const {
      incrementResults,
      isLoadingPagination,
    } = this.state;

    if (amount < incrementResults) {
      return null;
    }

    if (remainingResults <= 0) {
      return (
        <div className={`${id}-paginationButton-wrapper`}>
          <p>No More Results from this Search.</p>
        </div>
      );
    }
    const label = 'View More Results';
    return (
      <div className={`${id}-paginationButton-wrapper`}>
        <BasicButton
          id={`${id}-paginationButton`}
          className={`${id}-paginationButton`}
          isLoading={isLoadingPagination}
          onClick={this.addMoreResults}
          label={label}
          icon={<DownWedgeIcon stroke="#1B7FA7" />}
          iconSide="right"
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
    const {
      amount,
      className,
      searchKeyword,
      selectedFacet,
      tabs,
    } = this.props;

    const {
      timeToLoadResults,
    } = this.state;

    let resultsNumberSuggestion;
    const textOfResult = amount === 1 ? 'result' : 'results';
    const resultMessageClass = (resultsLength === 0)
      ? 'noResultMessage' : `${className}-length`;

    if (!searchKeyword) {
      resultsNumberSuggestion = '';
    } else {
      resultsNumberSuggestion = (resultsLength === 0)
        ? 'No results were found'
        : `Found about ${amount.toLocaleString()} ${textOfResult} for `
        + `"${searchKeyword}"`;

      if (selectedFacet && Array.isArray(tabs)) {
        const tabArray = tabs;
        let selectedTabName = '';

        tabArray.forEach((tab) => {
          if (tab.label === selectedFacet) {
            selectedTabName = ` in ${tab.resultSummarydisplayName}`;
          }
        });

        resultsNumberSuggestion += selectedTabName;
      }
    }

    return (
      <p
        id="search-results-summary"
        className={resultMessageClass}
        aria-live="polite"
        aria-atomic="true"
        // Assigns the key to the element for telling React that this element should be re-rendered
        // every time when making a search request, even if the final result is
        // the same as previous. Therefore, aria-live can be picked up by screen readers.
        key={timeToLoadResults}
      >
        {resultsNumberSuggestion}
      </p>
    );
  }

  render() {
    const {
      amount,
      className,
      id,
      searchBySelectedFacetFunction,
      searchKeyword,
      selectedFacet,
      tabs,
    } = this.props;

    const {
      searchResults,
    } = this.state;

    const results = this.getList(searchResults);
    const inputValue = searchKeyword || '';

    return (
      <div className={`${className}-wrapper`}>
        {this.renderResultsNumberSuggestion(results.length)}
        <TabItem
          id="gs-tabs"
          tabs={tabs}
          selectedFacet={selectedFacet}
          searchBySelectedFacetFunction={searchBySelectedFacetFunction}
          saveSelectedTabValue={this.saveSelectedTabValue}
        />
        {typeof results.length !== 'undefined' && results.length !== 0 ? (
          <div tabIndex="0" role="tabpanel" aria-labelledby={`link_${displayNameForFacet(selectedFacet)}`}>
            <div className="clear-float" />
            <DivideLineIcon
              ariaHidden
              className={`${className}-divideLineIcon`}
              height="4"
              length="84"
              stroke="transparent"
              strokeWidth="4"
              title="divide.line.icon.svg"
              viewBox="0 0 84 4"
              width="84"
            />
            <ol id={id} className={className}>
              {results}
            </ol>
            {
              results.length % 10 === 0
              && this.renderSeeMoreButton(Math.min(amount - results.length, 10))
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
  results: PropTypes.arrayOf(PropTypes.object),
  amount: PropTypes.number,
  searchKeyword: PropTypes.string,
  resultsStart: PropTypes.number,
  selectedFacet: PropTypes.string,
  queriesForGA: PropTypes.objectOf(PropTypes.object),
  tabs: PropTypes.arrayOf(PropTypes.object),
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
