import React from 'react';
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
import searchApiCaller from '../../utils/SearchApiCaller';
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
      incrementResults: 10,
      searchResults: results,
      timeToLoadResults: new Date().getTime(),
      queriesForGA,
    };

    this.getList = this.getList.bind(this);
    this.addMoreResults = this.addMoreResults.bind(this);
    this.onChange = this.onChange.bind(this);
    this.moveFocusToNextPage = this.moveFocusToNextPage.bind(this);
    // The property to store all the nodes of the result items
    // We need these nodes so that we can have the items focused
    this.resultsItemNodes = {};
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
        ref={(node) => { this.resultsItemNodes[`result-${index}`] = node || null; }}
        title={item.title}
        link={item.link}
        snippet={item.snippet}
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

        try {
          this.resultsItemNodes[refResultIndex].refs[`${refResultIndex}-item`].focus();
        } catch (err) {
          // Skip to focus if for we do not have the node of the next result item
        }
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
   * The function calls searchApiCaller.makeClientApiCall() to get the result data
   * with the new resultsStart value. When it gets the response data,
   * it adds the new results items to the exist result array by Actions.addMoreSearchData().
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

    searchApiCaller.makeClientApiCall(searchKeyword, selectedFacet, nextResultCount,
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
      });
    this.moveFocusToNextPage(originalResultsStart, 0);
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
      id,
      amount,
    } = this.props;

    const {
      incrementResults,
    } = this.state;

    // Converts the string of amount into integer
    // We need to remove the possible thousands separators first
    const amountInt = parseInt(amount.replace(/[^0-9]+/g, ''), 10);

    if (amountInt < incrementResults) {
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
   * @param {number} resultsLength - the amount of the total result items
   * @return {HTML Element} p
   */
  renderResultsNumberSuggestion(resultsLength) {
    const {
      amount,
      className,
      searchKeyword,
      selectedFacet,
      tabs,
      isKeywordValid,
    } = this.props;

    const {
      timeToLoadResults,
    } = this.state;

    let resultsNumberSuggestion;
    // Converts the string of amount into integer
    // We need to remove the possible thousands separators first
    const amountInt = parseInt(amount.replace(/[^0-9]+/g, ''), 10);
    const textOfResult = amountInt === 1 ? 'result' : 'results';
    const resultMessageClass = (resultsLength === 0 || !isKeywordValid)
      ? 'noResultMessage' : `${className}-length`;

    if (!searchKeyword) {
      if (!isKeywordValid) {
        // Show 'Please enter a keyword' only if pressing a tab or
        // the search button without a keyword
        resultsNumberSuggestion = 'Please enter a keyword';
      } else {
        // If go to the root URL without a keyword for the first time,
        // it will not show 'Please enter a keyword'
        resultsNumberSuggestion = '';
      }
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
      suggestion,
    } = this.props;

    const {
      searchResults,
    } = this.state;

    const results = this.getList(searchResults);
    const inputValue = searchKeyword || '';
    // Converts the string of amount into integer
    // We need to remove the possible thousands separators first
    const amountInt = parseInt(amount.replace(/[^0-9]+/g, ''), 10);
    console.log('suggestion:', suggestion)
    if (suggestion) {
      suggestion.update(this.renderResultsNumberSuggestion(results.length));
    }
    return (
      <div className={`minHeight gs-mainContent ${className}-wrapper`}>
        {typeof results.length !== 'undefined' && results.length !== 0 ? (
          <div
            tabIndex="0"
            role="tabpanel"
            aria-labelledby={`link_${displayNameForFacet(selectedFacet)}`}
          >
            <div className="clear-float" />
            <ol id={id} className={className}>
              {results}
            </ol>
            {
              results.length % 10 === 0
              && this.renderSeeMoreButton(Math.min(amountInt - results.length, 10))
            }
            <ReturnLink linkRoot="/search/apachesolr_search/" inputValue={inputValue} />
          </div>
        ) : null}
      </div>
    );
  }
}

Results.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.object),
  amount: PropTypes.string,
  searchKeyword: PropTypes.string,
  isKeywordValid: PropTypes.bool,
  resultsStart: PropTypes.number,
  selectedFacet: PropTypes.string,
  queriesForGA: PropTypes.objectOf(PropTypes.any),
  tabs: PropTypes.arrayOf(PropTypes.object),
  searchBySelectedFacetFunction: PropTypes.func.isRequired,
};

Results.defaultProps = {
  id: 'results',
  className: 'results',
  results: [],
  amount: '0',
  searchKeyword: '',
  isKeywordValid: true,
  resultsStart: 0,
  selectedFacet: '',
  queriesForGA: {},
  tabs: [],
};

export default Results;
