import React from 'react';

// Import components
import ResultsItem from '../ResultsItem/ResultsItem.jsx';
import { DivideLineIcon } from 'dgx-svg-icons';
// import { PaginationButton } from 'dgx-react-buttons';

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
