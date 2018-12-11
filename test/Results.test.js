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

  describe('if there is no results and no search keyword', () => {
    let component;

    before(() => {
      component  = shallow(<Results />);
    });

    it('should render no results summary.', () => {

      expect(component.find('#search-results-summary').text()).to.deep.equal('');
    });
  });

  describe('if there is no results but has a search keyword', () => {
    let component;

    before(() => {
      component  = shallow(<Results tabs={tabs} searchKeyword={'jibberish'} results={[]} />);
    });

    it('should render no results summary.', () => {

      expect(component.find('#search-results-summary').text()).to.deep.equal(
        'No results were found'
      );
    });
  });

  describe('if there is no results but has a search keyword and a facet other than "All" is selected', () => {
    let component;

    before(() => {
      component  = shallow(<Results tabs={tabs} searchKeyword={'jibberish'} selectedFacet={'events_classes'} results={[]} />);
    });

    it('should render no results summary with the facet indicated.', () => {

      expect(component.find('#search-results-summary').text()).to.deep.equal(
        'No results were found in events'
      );
    });
  });

  describe('if there is no results but has a search keyword and the facet "All" is selected', () => {
    let component;

    before(() => {
      // When the selected facet is all, that means no selectedFacet value is passde to the component
      component  = shallow(<Results tabs={tabs} searchKeyword={'jibberish'} selectedFacet={''} results={[]} />);
    });

    it('should render no results summary with the facet indicated.', () => {

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
      component = shallow(<Results tabs={tabs} amount={amount} searchKeyword={'okapi'} selectedFacet={'articles_databases'} results={results} />);
    });

    it('should render the proper summary for the results.', () => {
      expect(component.find('#search-results-summary').text()).to.deep.equal('Found about 3 results for "okapi" in databases');
    });
  });

  describe('if more than 1 results are returned and the facet "All" is selected', () => {
    let component;
    const results = [{}, {}, {}];
    const amount = results.length;

    before(() => {
      // When the selected facet is all, that means no selectedFacet value is passde to the component
      component = shallow(<Results tabs={tabs} amount={amount} searchKeyword={'okapi'} selectedFacet={''} results={results} />);
    });

    it('should render the proper summary for the results.', () => {
      expect(component.find('#search-results-summary').text()).to.deep.equal('Found about 3 results for "okapi"');
    });
  });

  describe('if only 1 result is returned', () => {
    let component;
    const results = [{}];
    const amount = results.length;

    before(() => {
      component = shallow(<Results tabs={tabs} amount={amount} searchKeyword={'volcano'} selectedFacet={'articles_databases'} results={results} />);
    });

    it('should render the proper summary for the 1 result.', () => {
      expect(component.find('#search-results-summary').text()).to.deep.equal('Found about 1 result for "volcano" in databases');
    });
  });
});
