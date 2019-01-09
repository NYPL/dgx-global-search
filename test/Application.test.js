/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Application from '../src/app/components/Application/Application';
import Actions from '../src/app/actions/Actions';
import makeClientApiCall from '../src/app/utils/MakeClientApiCall';

describe('Application', () => {
  describe('after component mounted', () => {
    let component;

    before(() => {
      component = shallow(<Application />);
      // Set the state of searchKeyword to "duckie" right after it is shallow mounted
      component.setState({ searchKeyword: 'duckie' });
    });

    it('is wrapped in a div.nyplGlobalSearchApp', () => {
      expect(component.find('.nyplGlobalSearchApp')).to.have.length(1);
    });

    it('contains an h1.', () => {
      const title = component.find('h1');
      expect(title).to.have.length(1);
      expect(title.text()).to.equal('NYPL.org Search');
    });

    it('should render a link to catalog search page with current search keywords.', () => {
      const catalogSearchLink = component.find('.gs-search-catalog-link');

      expect(component.find('.gs-search-catalog-link')).to.have.length(1);
      expect(catalogSearchLink.text()).to.deep.equal('Find books, music, or movies instead >');
      expect(catalogSearchLink.props().href).to.deep.equal(
        'https://browse.nypl.org/iii/encore/search/C__Sduckie__Orightresult__U?lang=eng&suite=def',
      );
    });
  });

  describe('submitSearchRequest', () => {
    const updateSelectedFacetSpy = sinon.spy(Actions, 'updateSelectedFacet');
    const updateIsKeywordValidSpy = sinon.spy(Actions, 'updateIsKeywordValid');
    const updateSearchKeywordSpy = sinon.spy(Actions, 'updateSearchKeyword');
    const updateSearchDataSpy = sinon.spy(Actions, 'updateSearchData');
    const makeClientApiCallSpy = sinon.spy(makeClientApiCall, 'makeClientApiCall');

    describe('if there is no valid search keyword', () => {
      let component;

      before(() => {
        component = shallow(<Application />);
        component.setState({ searchKeyword: undefined });
        // Before testing function submitSearchRequest's outcome,
        // we need to call it first
        component.instance().submitSearchRequest('blog_posts');
      });

      afterEach(() => {
        updateSelectedFacetSpy.reset();
        updateIsKeywordValidSpy.reset();
        updateSearchKeywordSpy.reset();
        updateSearchDataSpy.reset();
        makeClientApiCallSpy.reset();
      });

      it('should run certain Actions methods with proper arguments.', () => {
        expect(updateSelectedFacetSpy.withArgs('blog_posts').calledOnce).to.equal(true);
        expect(updateIsKeywordValidSpy.withArgs(false).calledOnce).to.equal(true);
        expect(updateSearchKeywordSpy.withArgs('').calledOnce).to.equal(true);
        expect(updateSearchDataSpy.withArgs([]).calledOnce).to.equal(true);
        expect(makeClientApiCallSpy.notCalled).to.equal(true);
      });
    });

    describe('if there is a valid search keyword', () => {
      let component;

      before(() => {
        component = shallow(<Application />);
        component.setState({ searchKeyword: 'okapi' });
        // Before testing function submitSearchRequest's outcome,
        // we need to call it first
        component.instance().submitSearchRequest('blog_posts');
      });

      afterEach(() => {
        makeClientApiCallSpy.reset();
      });

      it('should execute the function to make a search request.', () => {
        expect(makeClientApiCallSpy.withArgs('okapi', 'blog_posts', 0).calledOnce).to.equal(true);
      });
    });
  });
});
