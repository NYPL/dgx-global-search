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
      <div>
        {results}
      </div>
    );
  }
}

export default ResultsNumberSuggestion;
