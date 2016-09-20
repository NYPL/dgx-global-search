/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Application from './../src/app/components/Application/Application.jsx';


describe('Application', () => {
  let component;

  before(() => {
    component = shallow(<Application />);
  });

  it('is wrapped in a div.nyplGlobalSearchApp', () => {
    expect(component.find('.nyplGlobalSearchApp')).to.have.length(1);
  });

  it('contains an h2.', () => {
    const title = component.find('h1');
    expect(title).to.have.length(1);
    expect(title.text()).to.equal('NYPL.org Search BETA');
  });
});
