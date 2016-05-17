import React from 'react';

// Import components
import SearchResult from '../SearchResult/SearchResult.jsx';

// Import libraries
import { map as _map } from 'underscore';

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.getList = this.getList.bind(this);
  }

  getList(appsArray) {
    return _map(appsArray, (appName, index) => (
      <SearchResult
        key={index}
        index={index}
        title={appName.title}
        link={appName.link}
        snippet={appName.snippet}
        thumbnailSrc={appName.thumbnailSrc}
      />
    ));
  }

  render() {
    const results = this.getList(this.props.results);

    // Message if no result found
    if (results.length === 0) {
      return (
        <p className='noResultMessage'>No items were found...</p>
      );
    }

    return (
      <div className="resultWrapper">
        <p>We got {this.props.amount} results.</p>
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
};

Results.defaultProps = {
  lang: 'en',
  id: 'searchResults',
  className: 'searchResults',
};

export default Results;
