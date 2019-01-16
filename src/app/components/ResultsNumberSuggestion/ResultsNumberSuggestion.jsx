import React from 'react';

const ResultsNumberSuggestion = (props) => {
  const {
    amount,
    className,
    searchKeyword,
    selectedFacet,
    tabs,
    isKeywordValid,
    resultsLength,
  } = props;

  let resultsNumberSuggestion;
  // Converts the string of amount into integer
  // We need to remove the possible thousands separators first
  const amountInt = parseInt(amount.replace(/[^0-9]+/g, ''), 10);
  const textOfResult = amountInt === 1 ? 'result' : 'results';
  const resultMessageClass = (resultsLength === '0' || !isKeywordValid)
    ? 'noResultMessage' : `${className}-length`;

  if (!searchKeyword) {
    if (!isKeywordValid) {
      // Show 'Please enter a keyword' only if pressing a tab or
      // the search button without a keyword
      resultsNumberSuggestion = 'Please enter a keyword';
    } else {
      // If go to the root URL without a keyword for the first time,
      // it will not show 'Please enter a keyword'
      resultsNumberSuggestion = '';
    }
  } else {
    resultsNumberSuggestion = (resultsLength === "0")
      ? 'No results were found'
      : `Found about ${amount.toLocaleString()} ${textOfResult} for `
      + `"${searchKeyword}"`;

    if (selectedFacet && Array.isArray(tabs)) {
      const tabArray = tabs;
      let selectedTabName = '';

      tabArray.forEach((tab) => {
        if (tab.label === selectedFacet) {
          selectedTabName = ` in ${tab.resultSummarydisplayName}`;
        }
      });

      resultsNumberSuggestion += selectedTabName;
    }
  }

  return (
    <p
      id="search-results-summary"
      className={resultMessageClass}
      aria-live="polite"
      aria-atomic="true"
      // Assigns the key to the element for telling React that this element should be re-rendered
      // every time when making a search request, even if the final result is
      // the same as previous. Therefore, aria-live can be picked up by screen readers.
      key='results-number-suggestion'
    >
      {resultsNumberSuggestion}
    </p>
  );
}

export default ResultsNumberSuggestion;
