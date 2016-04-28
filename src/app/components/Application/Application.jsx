import React from 'react';

import Header from 'dgx-header-component';
import Footer from 'dgx-react-footer';

import Store from '../../stores/Store.js';

import { map as _map } from 'underscore';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    this._getList = this._getList.bind(this);
  }

  // Helper functions below the render() function:
  _getList(appsArray) {
    if (appsArray === undefined) {
      return 'No result found. Please make sure you enter search key words.';
    }

    return _map(appsArray, (appName, index) => (<li key={index}>{appName.attributes.title}</li>));
  }

  render() {
    const searchResults = this._getList(this.state.searchData);

    return (
      <div className="app-wrapper">
        <Header />

        <h2>NYPL Rocks!</h2>
        <p>Our Angular Apps</p>
        <ul>
          {searchResults}
        </ul>

        <Footer />
      </div>
    );
  }
}

export default App;
