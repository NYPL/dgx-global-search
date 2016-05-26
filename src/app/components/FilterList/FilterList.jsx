import React from 'react';

import { ApplyIcon, FilterIcon, ResetIcon } from 'dgx-svg-icons';

import CloseButton from '../CloseButton/CloseButton.jsx';

// Import libraries
import { map as _map } from 'underscore';
import ClickOutComponent from 'react-onclickout';

class FilterList extends ClickOutComponent {
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
        className={`${this.props.className} ${this.props.active}`}
        onClickOut={this.props.clickClose}
      >
        <div className={`${this.props.className}-navigation`}>
          <FilterIcon
            ariaHidden={true}
            className={`${this.props.className}-filterIcon`}
            fill="#FFF"
            height="46"
            width="46"
            title="filter.icon.svg"
            viewBox="0 0 32 32"
          />
          <h4>Filter by</h4>
          <div className={`${this.props.className}-buttonWrapper`}>
            <button className="apply">
              <ApplyIcon
                ariaHidden={true}
                className={`${this.props.className}-applyIcon`}
                fill="#FFF"
                height="40"
                width="40"
                title="apply.icon.svg"
                viewBox="0 0 32 32"
              />
            </button>
            <CloseButton
              className="closeButton"
              width="64"
              height="64"
              fill="#FFF"
              clickClose={this.props.clickClose}
              viewBox="-8 8 32 32"
            />
          </div>
        </div>
        <ul className={`${this.props.className}-items`}>
          {this.renderfacets()}
        </ul>
        <button className="PillButton reset">
          <ResetIcon
            ariaHidden={true}
            className="this.props.className"
            fill="#FFF"
            height="32"
            title="refresh.icon.svg"
            viewBox="0 0 32 32"
            width="32"
          />
          <span>RESET</span>
        </button>
      </div>
    );
  }
}

FilterList.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  facets: React.PropTypes.array,
  clickClose: React.PropTypes.func,
  active: React.PropTypes.string,
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  fill: React.PropTypes.string,
};

export default FilterList;
