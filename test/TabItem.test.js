import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TabItem from './../src/app/components/TabItem/TabItem.jsx';

describe('TabItem', () => {
  let component;

  describe('if there is no tab array', () => {
    let component;

    before(() => {
      component = shallow(<TabItem />);
    });

    it('should not render the select element of the tabs on mobile view.', () => {
      expect(component.find('select')).to.have.length(0);
      expect(component.find('select').find('option')).to.have.length(0);
    });

    it('should not render the list of the tabs on desktop view.', () => {
      expect(component.find('ul')).to.have.length(0);
      expect(component.find('ul').find('li')).to.have.length(0);
    });
  });

  describe('if there are three tabs passed down to the component', () => {
    let component;
    const tabs = [{ anchor: 'All' }, { anchor: 'Database' }, { anchor: 'Blogs' }];

    before(() => {
      component = shallow(<TabItem tabs={tabs} />);
    });

    it('should render 3 options of the tab list on mobile view.', () => {
      expect(component.find('select')).to.have.length(1);
      expect(component.find('select').find('option')).to.have.length(3);
    });

    it('should render the option values with correct anchors.', () => {
      expect(component.find('select').find('option').at(0).text()).to.deep.equal('All');
      expect(component.find('select').find('option').at(1).text()).to.deep.equal('Database');
      expect(component.find('select').find('option').at(2).text()).to.deep.equal('Blogs');
    });

    it('should render 3 list items of the tab list on desktop view.', () => {
      expect(component.find('ul')).to.have.length(1);
      expect(component.find('ul').find('li')).to.have.length(3)
    });

    it('should render the list item values with correct anchors.', () => {
      expect(component.find('ul').find('li').at(0).text()).to.deep.equal('All');
      expect(component.find('ul').find('li').at(1).text()).to.deep.equal('Database');
      expect(component.find('ul').find('li').at(2).text()).to.deep.equal('Blogs');
    });
  });
});
