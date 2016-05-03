import React from 'react';

import Header from 'dgx-header-component';
import Footer from 'dgx-react-footer';
import Results from '../Results/Results.jsx';

import Store from '../../stores/Store.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
  }


  render() {
    return (
      <div className="app-wrapper">
        <Header />

        <h2>Global Search Results</h2>
        <p>the search item titles</p>
          <Results results={this.state.searchData} />

        <Footer />
      </div>
    );
  }
}

export default App;
