import React from 'react';

import axios from 'axios';
import parser from 'jsonapi-parserinator';
import {
  fetchResultLength,
  fetchResultItems,
  fetchSearchKeyword,
  fetchSearchFacets,
} from './../../utils/SearchModel.js';

// Import alt components
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Import components
import ResultsItem from '../ResultsItem/ResultsItem.jsx';
import { DivideLineIcon } from 'dgx-svg-icons';
import { PaginationButton } from 'dgx-react-buttons';

// Import libraries
import { map as _map } from 'underscore';

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchStart: 10,
      resultsItems: this.props.results,
      isLoading: false,
    };

    this.getList = this.getList.bind(this);
    this.updateSearchStart = this.updateSearchStart.bind(this);
    this.addMoreResults = this.addMoreResults.bind(this);
  }

  /**
   * getList(itemsArray)
   * The function map the array of the search result,
   * and render each item of the array as <ResultsItem> into a new array.
   *
   * @param {itemsArray} array
   * @return array
   */
  getList(itemsArray) {
    return _map(itemsArray, (item, index) => (
      <ResultsItem
        key={index}
        index={index}
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
   * updateSearchStart()
   * The function updates which result item the api call is going to start to fetch at,
   * and then updates it to the state. Now it always starts from the next tenth item
   * after clickin the pagination button.
   *
   */
  updateSearchStart() {
    this.setState({ searchStart: this.state.searchStart + 10, });
  }

  /**
   * addMoreResults()
   * The function calls updateSearchStart() and then fires axios get method with the new start item.
   * When it gets the response data, it models the data and adds the new results items to the exist
   * result array by Actions.addMoreSearchData().
   *
   */
  addMoreResults() {
    this.updateSearchStart();

    axios.interceptors.request.use(config => {
      // Do something before request is sent
      this.setState({ isLoading: true });
      return config;
    }, error => Promise.reject(error));

    axios.get(`/search/apachesolr_search/${this.props.searchKeyword}?start=${this.state.searchStart}`)
    .then((response) => {
      const requestResult = parser.parse(response.data.data);

      // Actions.addMoreSearchData concats the new result items to the exist result items array in
      // the Store.
      Actions.addMoreSearchData(fetchResultItems(requestResult));

      // Updates the state by the new array of Store.getState().searchData
      this.setState({
        resultsItems: Store.getState().searchData,
        isLoading: false,
      });
    });
  }

  render() {
    const results = this.getList(this.state.resultsItems);
    const resultsRemainLength = (this.props.amount - results.length).toString();

    // Message if no result found
    if (results.length === 0) {
      return (
        <p className="noResultMessage">No items were found...</p>
      );
    }

    return (
      <div className={`${this.props.className}-wrapper`}>
        <p className={`${this.props.className}-length`}>
          We found about {this.props.amount} results.
        </p>
        <DivideLineIcon
          ariaHidden
          className={`${this.props.className}-divideLineIcon`}
          height="2"
          length="84"
          stroke="#279975"
          strokeWidth="2"
          title="divide.line.icon.svg"
          viewBox="0 0 84 2"
          width="84"
        />
        <ul id={this.props.id} className={this.props.className}>
          {results}
        </ul>
        <div className={`${this.props.id}-paginationButton-wrapper`}>
          <PaginationButton
            id={`${this.props.id}-paginationButton`}
            className={`${this.props.id}-paginationButton`}
            isLoading={this.state.isLoading}
            onClick={this.addMoreResults}
            label={resultsRemainLength}
          />
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  results: React.PropTypes.array,
  amount: React.PropTypes.number,
};

Results.defaultProps = {
  lang: 'en',
  id: 'results',
  className: 'results',
};

export default Results;
