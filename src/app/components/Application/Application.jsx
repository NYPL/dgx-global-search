import React from 'react';

import Header from 'dgx-header-component';
import Footer from 'dgx-react-footer';

import Store from '../../stores/Store.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    this._getList = this._getList.bind(this);
  }

  // Helper functions below the render() function:
  _getList(appsArray) {
    return appsArray.map((appName, index) =>
      (<li key={index}>{appName.attributes.title}</li>)
    );
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
