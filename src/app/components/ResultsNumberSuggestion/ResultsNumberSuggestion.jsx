import React from 'react';

class ResultsNumberSuggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
    };
  }

  update(results) {
    this.setState({
      results,
    });
  }

  render() {
    const {
      results,
    } = this.state;

    if (results) {
      return (
        <div className="gs-results-wrapper">
          {results}
        </div>
      );
    }
    return (
      <div className="gs-results-wrapper">
        <p
          id="search-results-summary"
          className="noResultMessage"
          aria-live="polite"
          aria-atomic="true"
          data-reactid="223"
        />
      </div>
    );
  }
}

export default ResultsNumberSuggestion;
