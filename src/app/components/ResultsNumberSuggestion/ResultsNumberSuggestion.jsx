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
    return (
      (results
        ? (
          <div>
            {results}
          </div>
        )
        : (
          <p
            id="search-results-summary"
            className="noResultMessage"
            aria-live="polite"
            aria-atomic="true"
            data-reactid="223"
          />
        )
      )
    );
  }
}

export default ResultsNumberSuggestion;
