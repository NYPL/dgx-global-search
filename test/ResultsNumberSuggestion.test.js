import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ResultsNumberSuggestion from '../src/app/components/ResultsNumberSuggestion/ResultsNumberSuggestion';

describe('ResultsNumberSuggestion', () => {
  describe('if the user visits the main page without a keyword', () => {
    let component;

    before(() => {
      component = shallow(
        <ResultsNumberSuggestion
          isKeywordValid
          amount="0"
          resultsLength="0"
        />
      );
    });

    it('search results summary should be empty.', () => {
      expect(component.find('#search-results-summary').text()).to.deep.equal('');
      expect(component.find('#search-results-summary').hasClass('noResultMessage'))
        .to.equal(true);
      expect(component.find('#search-results-summary').hasClass('results-length'))
        .to.equal(false);
    });
  });

  describe('if the user requests searching without a search keyword', () => {
    let component;
    before(() => {
      component = shallow(
        <ResultsNumberSuggestion
          amount="0"
          isKeywordValid={false}
        />,
      );
    });


    it('should show the message asking for a search keyword.', () => {
      expect(component.find('#search-results-summary').text())
        .to.deep.equal('Please enter a keyword');
      expect(component.find('#search-results-summary').hasClass('noResultMessage'))
        .to.equal(true);
      expect(component.find('#search-results-summary').hasClass('results-length'))
        .to.equal(false);
    });
  });

  describe('if there are no results but there is a search keyword', () => {
    let component;

    before(() => {
      component = shallow(
        <ResultsNumberSuggestion
          searchKeyword="jibberish"
          isKeywordValid
          amount="0"
        />,
      );
    });

    it('should render "No results were found.', () => {
      expect(component.find('#search-results-summary').text()).to.deep.equal(
        'No results were found',
      );
      expect(component.find('#search-results-summary').hasClass('noResultMessage'))
        .to.equal(true);
      expect(component.find('#search-results-summary').hasClass('results-length'))
        .to.equal(false);
    });
  });


});
      //
      //
      //       it('should render "No results were found in selected_facet_name".', () => {
      //         expect(component.find('#search-results-summary').text()).to.deep.equal(
      //           'No results were found in events',
      //         );
      //         expect(component.find('#search-results-summary').hasClass('noResultMessage'))
      //           .to.equal(true);
      //         expect(component.find('#search-results-summary').hasClass('results-length'))
      //           .to.equal(false);
      //       });
      //
      //
      //             it('should render "No results were found".', () => {
      //               expect(component.find('#search-results-summary').text()).to.deep.equal(
      //                 'No results were found',
      //               );
      //               expect(component.find('#search-results-summary').hasClass('noResultMessage'))
      //                 .to.equal(true);
      //               expect(component.find('#search-results-summary').hasClass('results-length'))
      //                 .to.equal(false);
      //             });
      //
      //
      //                   it('should render the proper summary for the results.', () => {
      //                     expect(component.find('#search-results-summary').text()).to.deep.equal(
      //                       'Found about 3 results for "okapi" in databases',
      //                     );
      //                     expect(component.find('#search-results-summary').hasClass('noResultMessage'))
      //                       .to.equal(false);
      //                     expect(component.find('#search-results-summary').hasClass('results-length'))
      //                       .to.equal(true);
      //                   });
      //
      //                   it('should display a result page with valid results.', () => {
      //                     expect(component.find('#results').children()).to.have.length(3);
      //                   });
      //
      //
      //                         it('should render the proper summary for the results.', () => {
      //                           expect(component.find('#search-results-summary').text()).to.deep.equal(
      //                             'Found about 3 results for "okapi"',
      //                           );
      //                           expect(component.find('#search-results-summary').hasClass('noResultMessage')).to.equal(false);
      //                           expect(component.find('#search-results-summary').hasClass('results-length')).to.equal(true);
      //                         });
      //
      //
      //                               it('should render the proper summary for the 1 result.', () => {
      //                                 expect(component.find('#search-results-summary').text()).to.deep.equal(
      //                                   'Found about 1 result for "volcano" in databases',
      //                                 );
      //                                 expect(component.find('#search-results-summary').hasClass('noResultMessage')).to.equal(false);
      //                                 expect(component.find('#search-results-summary').hasClass('results-length')).to.equal(true);
      //                               });
