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
        title={appName.attributes.title}
        link={appName.attributes.link}
      />
    ));
  }

  render() {
    const results = this.getList(this.props.results);

    // Message if no result found
    if (results.length === 0) {
      return (
        <div>No result found.</div>
      );
    }

    return (
      <ul id={this.props.id} className={this.props.className}>
        {results}
      </ul>
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
