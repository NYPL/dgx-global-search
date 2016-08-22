import React from 'react';
import ReactDOM from 'react-dom';

// Import alt components
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import components
import ResultsItem from '../ResultsItem/ResultsItem.jsx';
import { DivideLineIcon } from 'dgx-svg-icons';
import { PaginationButton } from 'dgx-react-buttons';

// Import libraries
import { map as _map } from 'underscore';

// Import utilities
import { makeClientApiCall } from '../../utils/MakeClientApiCall.js';

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsStart: this.props.resultsStart,
      isLoading: false,
      incrementResults: 10,
      searchResults: this.props.results,
    };

    this.getList = this.getList.bind(this);
    this.addMoreResults = this.addMoreResults.bind(this);
    this.onChange = this.onChange.bind(this);
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
    // Update the Store with new fetched data
    this.setState({
      resultsStart: Store.getState().resultsStart,
      isLoading: false,
      searchResults: Store.getState().searchData,
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
        link={item.link}
        snippet={item.snippet}
        thumbnailSrc={item.thumbnailSrc}
        label={item.label}
        className={`${this.props.className}Item`}
      />
    ));
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

    makeClientApiCall(this.props.searchKeyword, this.props.selectedFacet, nextResultCount,
      (searchResultsItems) => {
        Actions.addMoreSearchData(searchResultsItems);
        Actions.updateResultsStart(nextResultCount);
      },
      () => {
        Actions.updateSearchKeyword('');
        Actions.updateIsKeywordValid(false);
      },
      (value) => {
        this.setState({ isLoading: value });
      }
    );

    // Automatically focus on the first item of the newly reloaded results
    setTimeout(() => {
      const refResultIndex = `result-${this.state.resultsStart}`;

      ReactDOM.findDOMNode(this.refs[refResultIndex].refs[`${refResultIndex}-item`]).focus();
    }, 2000);
  }

  /**
   * renderSeeMoreButton(remainingResults)
   * The function renders a see more button,
   * unless there's no more results, instead of rendering the button,
   * it renders the suggestion text to indicate no more result.
   *
   * @param {number} remainingResults
   * @return {object}
   */
  renderSeeMoreButton(remainingResults) {
    if (remainingResults <= 0) {
      return (
        <div className={`${this.props.id}-paginationButton-wrapper`}>
          <p>No More Results from this Search.</p>
        </div>
      );
    }

    return (
      <div className={`${this.props.id}-paginationButton-wrapper`}>
        <PaginationButton
          id={`${this.props.id}-paginationButton`}
          className={`${this.props.id}-paginationButton`}
          isLoading={this.state.isLoading}
          onClick={this.addMoreResults}
          label="See More"
        />
      </div>
    );
  }

  /**
   * renderNoResult()
   * The function renders the result section if there's no results were found.
   *
   * @return {object}
   */
  renderNoResult() {
    return (
      <p
        className="noResultMessage"
        role="alert"
        aria-atomic="true"
      >
        No items were found...
      </p>
    );
  }

  render() {
    const results = this.getList(this.state.searchResults);
    const resultsRemainLength = this.props.amount - results.length;
    const resultsNumberSuggestion = `We found about ${this.props.amount} results.`;

    // Message if no result found
    if (results.length === 0) {
      return (
        <div>
          {this.renderNoResult()}
        </div>
      );
    }

    return (
      <div className={`${this.props.className}-wrapper`}>
        <p
          className={`${this.props.className}-length`}
          role="alert"
          aria-atomic="true"
        >
          {resultsNumberSuggestion}
        </p>
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
        <ul id={this.props.id} className={this.props.className} ref="results">
          {results}
        </ul>
        {this.renderSeeMoreButton(resultsRemainLength)}
      </div>
    );
  }
}

Results.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  results: React.PropTypes.array,
  amount: React.PropTypes.number,
  searchKeyword: React.PropTypes.string,
  resultsStart: React.PropTypes.number,
  selectedFacet: React.PropTypes.string,
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
};

export default Results;
