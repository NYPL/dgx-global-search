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
        <div>
          {results}
        </div>
      );
    }
    return (
      <div>
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
