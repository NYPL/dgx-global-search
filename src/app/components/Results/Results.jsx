import React from 'react';
import SearchResult from '../SearchResult/SearchResult.jsx';

import { map as _map } from 'underscore';

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.getList = this.getList.bind(this);
  }

  // Helper functions below the render() function:
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
