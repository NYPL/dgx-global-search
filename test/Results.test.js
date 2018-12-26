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

  describe('if the user visits the main page without keyword as a pathname', () => {
    let component;

    before(() => {
      component  = shallow(<Results isKeywordValid={true} />);
    });

    it('search results summary should be empty.', () => {
      expect(component.find('#search-results-summary').text()).to.deep.equal('');
    });
  });

  describe('if the user requests search wihtout any search keyword', () => {
    let component;

    before(() => {
      component = shallow(<Results isKeywordValid={false} />);
    });

    it('should show the message asking for a search keyword', () => {
      expect(component.find('#search-results-summary').text())
        .to.deep.equal('Please enter a keyword');
    });
  });

  describe('if there are no results but there is a search keyword', () => {
    let component;

    before(() => {
      component  = shallow(<Results tabs={tabs} searchKeyword={'jibberish'} results={[]} />);
    });

    it('should render "No results were found.', () => {
      expect(component.find('#search-results-summary').text()).to.deep.equal(
        'No results were found'
      );
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
        />);
    });

    it('should render "No results were found in selected_facet_name".', () => {
      expect(component.find('#search-results-summary').text()).to.deep.equal(
        'No results were found in events'
      );
    });
  });

  describe('if there is a search keyword and the facet "All" is selected, ' +
    'yet there are no search results', () => {
    let component;

    before(() => {
      // When the selected facet is all, that means no selectedFacet value is passed to
      // the component
      component  = shallow(
        <Results tabs={tabs} searchKeyword={'jibberish'} selectedFacet={''} results={[]} />
      );
    });

    it('should render "No results were found".', () => {
      expect(component.find('#search-results-summary').text()).to.deep.equal(
        'No results were found'
      );
    });
  });

  describe('if more than 1 results are returned and a facet other than "All" is selected', () => {
    let component;
    const results = [{}, {}, {}];
    const amount = results.length;

    before(() => {
      component = shallow(
        <Results
          tabs={tabs}
          amount={amount}
          searchKeyword={'okapi'}
          selectedFacet={'articles_databases'}
          results={results}
        />
      );
    });

    it('should render the proper summary for the results.', () => {
      expect(component.find('#search-results-summary').text()).to.deep.equal(
        'Found about 3 results for "okapi" in databases'
      );
    });
  });

  describe('if more than 1 result are returned and the facet "All" is selected', () => {
    let component;
    const results = [{}, {}, {}];
    const amount = results.length;

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
        />
      );
    });

    it('should render the proper summary for the results.', () => {
      expect(component.find('#search-results-summary').text()).to.deep.equal(
        'Found about 3 results for "okapi"'
      );
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
        />
      );
    });

    it('should render the proper summary for the 1 result.', () => {
      expect(component.find('#search-results-summary').text()).to.deep.equal(
        'Found about 1 result for "volcano" in databases'
      );
    });
  });
});
