/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Application from './../src/app/components/Application/Application.jsx';

describe('Application', () => {
  let component;

  before(() => {
    component = shallow(<Application />);
    // Set the state of searchKeyword to "duckie" right after it is shallow mounted
    component.setState({ searchKeyword: 'duckie'});
  });

  it('is wrapped in a div.nyplGlobalSearchApp', () => {
    expect(component.find('.nyplGlobalSearchApp')).to.have.length(1);
  });

  it('contains an h1.', () => {
    const title = component.find('h1');
    expect(title).to.have.length(1);
    expect(title.text()).to.equal('NYPL.org Search BETA');
  });

  it('should render a link to catalog search page with current search keywords.', () => {
    const catalogSearchLink = component.find('.gs-search-catalog-link');

    expect(component.find('.gs-search-catalog-link')).to.have.length(1);
    expect(catalogSearchLink.text()).to.deep.equal('Find books, music, or movies instead >');
    expect(catalogSearchLink.props().href).to.deep.equal(
      'https://browse.nypl.org/iii/encore/search/C__Sduckie__Orightresult__U?lang=eng&suite=def'
    );
  });
});
