import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Results from './../src/app/components/Results/Results.jsx';

describe('Results', () => {
  const tabs = [
    { anchor: 'All', label: 'all_results', resultSummarydisplayName: '' },
    { anchor: 'Database', label: 'articles_databases', resultSummarydisplayName: 'databases' },
    { anchor: 'Events', label: 'events_classes', resultSummarydisplayName: 'events' }
  ];

  describe('Search results summary', () => {
    describe('if the user visits the main paqgie without a keyword as the pathname', () => {
      let component;

      before(() => {
        component  = shallow(<Results isKeywordValid={true} />);
      });

      it('search results summary should be empty.', () => {
        expect(component.find('#search-results-summary').text()).to.deep.equal('');
        expect(component.find('#search-results-summary').hasClass('noResultMessage'))
          .to.equal(true);
        expect(component.find('#search-results-summary').hasClass('results-length'))
          .to.equal(false);
      });
    });

    describe('if the user requests searching wihtout a search keyword', () => {
      let component;

      before(() => {
        component = shallow(<Results isKeywordValid={false} />);
      });

      it('should show the message asking for a search keyword', () => {
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
        component  = shallow(
          <Results tabs={tabs} searchKeyword={'jibberish'} results={[]} isKeywordValid={true} />
        );
      });

      it('should render "No results were found.', () => {
        expect(component.find('#search-results-summary').text()).to.deep.equal(
          'No results were found'
        );
        expect(component.find('#search-results-summary').hasClass('noResultMessage'))
          .to.equal(true);
        expect(component.find('#search-results-summary').hasClass('results-length'))
          .to.equal(false);
      });
    });

    describe('if there is a search keyword and a facet other than "All" is selected, ' +
      'yet there are no matching search results', () => {
      let component;

      before(() => {
        component  = shallow(
          <Results
            tabs={tabs}
            searchKeyword={'jibberish'}
            selectedFacet={'events_classes'}
            results={[]}
            isKeywordValid={true}
          />);
      });

      it('should render "No results were found in selected_facet_name".', () => {
        expect(component.find('#search-results-summary').text()).to.deep.equal(
          'No results were found in events'
        );
        expect(component.find('#search-results-summary').hasClass('noResultMessage'))
          .to.equal(true);
        expect(component.find('#search-results-summary').hasClass('results-length'))
          .to.equal(false);
      });
    });

    describe('if there is a search keyword and the facet "All" is selected, ' +
      'yet there are no search results', () => {
      let component;

      before(() => {
        // When the selected facet is all, that means no selectedFacet value is passed to
        // the component
        component  = shallow(
          <Results
            tabs={tabs}
            searchKeyword={'jibberish'}
            selectedFacet={''}
            results={[]}
            isKeywordValid={true}
          />
        );
      });

      it('should render "No results were found".', () => {
        expect(component.find('#search-results-summary').text()).to.deep.equal(
          'No results were found'
        );
        expect(component.find('#search-results-summary').hasClass('noResultMessage'))
          .to.equal(true);
        expect(component.find('#search-results-summary').hasClass('results-length'))
          .to.equal(false);
      });
    });

    describe('if more than 1 results are returned and a facet other than "All" is selected', () => {
      let component;
      const results = [{}, {}, {}];
      const amount = results.length.toString();

      before(() => {
        component = shallow(
          <Results
            tabs={tabs}
            amount={amount}
            searchKeyword={'okapi'}
            selectedFacet={'articles_databases'}
            results={results}
            isKeywordValid={true}
          />
        );
      });

      it('should render the proper summary for the results.', () => {
        expect(component.find('#search-results-summary').text()).to.deep.equal(
          'Found about 3 results for "okapi" in databases'
        );
        expect(component.find('#search-results-summary').hasClass('noResultMessage'))
          .to.equal(false);
        expect(component.find('#search-results-summary').hasClass('results-length'))
          .to.equal(true);
      });
    });

    describe('if more than 1 result are returned and the facet "All" is selected', () => {
      let component;
      const results = [{}, {}, {}];
      const amount = results.length.toString();

      before(() => {
        // When the selected facet is all, that means no selectedFacet value is passed to
        // the component
        component = shallow(
          <Results
            tabs={tabs}
            amount={amount}
            searchKeyword={'okapi'}
            selectedFacet={''}
            results={results}
            isKeywordValid={true}
          />
        );
      });

      it('should render the proper summary for the results.', () => {
        expect(component.find('#search-results-summary').text()).to.deep.equal(
          'Found about 3 results for "okapi"'
        );
        expect(component.find('#search-results-summary').hasClass('noResultMessage')).to.equal(false);
        expect(component.find('#search-results-summary').hasClass('results-length')).to.equal(true);
      });
    });

    describe('if only 1 result is returned', () => {
      let component;
      const results = [{}];
      const amount = results.length;

      before(() => {
        component = shallow(
          <Results
            tabs={tabs}
            amount={amount}
            searchKeyword={'volcano'}
            selectedFacet={'articles_databases'}
            results={results}
            isKeywordValid={true}
          />
        );
      });

      it('should render the proper summary for the 1 result.', () => {
        expect(component.find('#search-results-summary').text()).to.deep.equal(
          'Found about 1 result for "volcano" in databases'
        );
        expect(component.find('#search-results-summary').hasClass('noResultMessage')).to.equal(false);
        expect(component.find('#search-results-summary').hasClass('results-length')).to.equal(true);
      });
    });
  });
});
