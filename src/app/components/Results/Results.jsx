import React from 'react';

// Import components
import ResultsItem from '../ResultsItem/ResultsItem.jsx';

// Import libraries
import { map as _map } from 'underscore';

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.getList = this.getList.bind(this);
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

  render() {
    const results = this.getList(this.props.results);

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
        <svg
          width="84"
          height="2"
          viewPort="0 0 84 2"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="0" x2="84" y2="0" stroke="#279975" strokeWidth="2" />
        </svg>
        <ul id={this.props.id} className={this.props.className}>
          {results}
        </ul>
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
