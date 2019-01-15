import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Results from '../src/app/components/Results/Results';

describe('Results', () => {
  const tabs = [
    { anchor: 'All', label: 'all_results', resultSummarydisplayName: '' },
    { anchor: 'Database', label: 'articles_databases', resultSummarydisplayName: 'databases' },
    { anchor: 'Events', label: 'events_classes', resultSummarydisplayName: 'events' },
  ];

  describe('Search results summary and search results', () => {
    describe('if the user visits the main page without a keyword as the pathname.', () => {
      let component;

      before(() => {
        component = shallow(<Results isKeywordValid />);
      });

      it('should display an empty result page.', () => {
        expect(component.find('#results').children()).to.have.length(0);
      });
    });

    describe('if the user requests searching wihtout a search keyword', () => {
      let component;

      before(() => {
        component = shallow(<Results isKeywordValid={false} />);
      });


      it('should display an empty result page.', () => {
        expect(component.find('#results').children()).to.have.length(0);
      });
    });

    describe('if there are no results but there is a search keyword.', () => {
      let component;

      before(() => {
        component = shallow(
          <Results
            tabs={tabs}
            searchKeyword="jibberish"
            results={[]}
            isKeywordValid
          />,
        );
      });

      it('should display an empty result page.', () => {
        expect(component.find('#results').children()).to.have.length(0);
      });
    });

    describe('if there is a search keyword and a facet other than "All" is selected, '
      + 'yet there are no matching search results', () => {
      let component;

      before(() => {
        component = shallow(
          <Results
            tabs={tabs}
            searchKeyword="jibberish"
            selectedFacet="events_classes"
            results={[]}
            isKeywordValid
          />,
        );
      });

      it('should display an empty result page.', () => {
        expect(component.find('#results').children()).to.have.length(0);
      });
    });

    describe('if there is a search keyword and the facet "All" is selected, '
      + 'yet there are no search results', () => {
      let component;

      before(() => {
        // When the selected facet is all, that means no selectedFacet value is passed to
        // the component
        component = shallow(
          <Results
            tabs={tabs}
            searchKeyword="jibberish"
            selectedFacet=""
            results={[]}
            isKeywordValid
          />,
        );
      });

      it('should display an empty result page.', () => {
        expect(component.find('#results').children()).to.have.length(0);
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
            searchKeyword="okapi"
            selectedFacet="articles_databases"
            results={results}
            isKeywordValid
          />,
        );
      });

      it('should display a result page with valid results.', () => {
        expect(component.find('#results').children()).to.have.length(3);
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
            searchKeyword="okapi"
            selectedFacet=""
            results={results}
            isKeywordValid
          />,
        );
      });

      it('should display a result page with valid results.', () => {
        expect(component.find('#results').children()).to.have.length(3);
      });
    });

    describe('if only 1 result is returned', () => {
      let component;
      const results = [{}];
      const amount = results.length.toString();

      before(() => {
        component = shallow(
          <Results
            tabs={tabs}
            amount={amount}
            searchKeyword="volcano"
            selectedFacet="articles_databases"
            results={results}
            isKeywordValid
          />,
        );
      });

      it('should display a result page with valid results.', () => {
        expect(component.find('#results').children()).to.have.length(1);
      });
    });
  });
});
