import React from 'react';

import { BasicButton } from 'dgx-react-buttons';
import { ApplyIcon, FilterIcon, ResetIcon } from 'dgx-svg-icons';

import CloseButton from '../CloseButton/CloseButton.jsx';

// Import libraries
import { map as _map } from 'underscore';
import ClickOut from 'react-onclickout';

class FilterList extends ClickOut {
  constructor(props) {
    super(props);

    this.renderfacets = this.renderfacets.bind(this);
    this.onClickOut = this.onClickOut.bind(this);
  }

  onClickOut() {
    this.props.clickClose();
  }

  renderfacets() {
    return _map(this.props.facets, (item, index) => (
      <li key={index}>{item}</li>
    ));
  }

  render() {
    return (
      <div
        className={this.props.className}
        onClickOut={this.props.clickClose}
      >
        <div className={`${this.props.className}-navigation`}>
          <FilterIcon
            ariaHidden
            className={`${this.props.className}-filterIcon`}
            fill="#FFF"
            height="32"
            title="filter.icon.svg"
            viewBox="0 0 32 32"
            width="32"
          />
          <h4>Filter by</h4>
          <div className={`${this.props.className}-buttonWrapper`}>
            <BasicButton
              id="applyButton"
              className="customButton apply"
              icon={
                <ApplyIcon
                  ariaHidden
                  className={`${this.props.className}-applyIcon`}
                  fill="#FFF"
                  height="32"
                  title="apply.icon.svg"
                  viewBox="0 0 32 32"
                  width="32"
                />
              }
              label="Apply Button"
              labelAccessible
            />
            <CloseButton
              id={`${this.props.id}-closeButton`}
              className={`customButton ${this.props.className}-closeButton`}
              onClick={this.onClickOut}
              ariaHidden
              fill="#FFF"
              height="32"
              title="x.icon.svg"
              viewBox="0 0 32 32"
              width="32"
            />
          </div>
        </div>
        <ul className={`${this.props.className}-items`}>
          {this.renderfacets()}
        </ul>
        <BasicButton
          id="resetButton"
          className="customButton reset"
          icon={
            <ResetIcon
              ariaHidden
              className={`${this.props.className}-resetIcon`}
              fill="#FFF"
              height="32"
              title="refresh.icon.svg"
              viewBox="0 0 32 32"
              width="32"
            />
          }
          label="RESET"
          labelAccessible={false}
        />
      </div>
    );
  }
}

FilterList.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  facets: React.PropTypes.array,
  clickClose: React.PropTypes.func,
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  fill: React.PropTypes.string,
};

export default FilterList;
