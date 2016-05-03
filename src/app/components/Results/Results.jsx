import React from 'react';
import SearchResult from '../SearchResult/SearchResult.jsx';

import { map as _map } from 'underscore';

class Results extends React.Component {
  constructor(props) {
    super(props);

    this._getList = this._getList.bind(this);
  }

  // Helper functions below the render() function:
  _getList(appsArray) {
    if (!appsArray) {
      return 'No result found. Please make sure you enter search key words.';
    }

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
    return (
      <div id={this.props.id} className={this.props.className}>
        {this._getList(this.props.results)}
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
