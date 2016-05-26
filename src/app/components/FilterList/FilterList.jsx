import React from 'react';

import { ResetIcon, FilterIcon } from 'dgx-svg-icons';

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
            aria-hidden="true"
            className={`${this.props.className}-icon`}
            fill="#FFF"
            height="46"
            width="46"
            title="filter.icon.svg"
            viewBox="0 0 32 32"
          />
          <h4>Filter by</h4>
          <div className={`${this.props.className}-buttonWrapper`}>
            <button className="apply">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32" height="32"
                fill="#FFF"
                viewBox="0 0 32 32"
              >
                <title>apply.icon.svg</title>
                <path
                  d={'M23.26,13.1819a1.2736,1.2736,0,0,0-1.7332,0L17,17.6253V6.1041a1.0119,' +
                    '1.0119,0,1,0-2,0V17.6253l-4.5268-4.4434a1.2212,1.2212,0,0,0-1.6916,0,1.17,' +
                    '1.17,0,0,0-.0208,1.65L15.1786,21.26l0,0.0083a1.1694,1.1694,0,0,0,1.6488,' +
                    '0l0.0048-.0083L23.26,14.8318A1.17,1.17,0,0,0,23.26,13.1819Z'}
                />
                <rect
                  x="14.8333"
                  y="16.3602"
                  width="2.3333"
                  height="16.6711"
                  rx="1.1667"
                  ry="1.1667"
                  transform="translate(-8.6957 40.6957) rotate(-90)"
                />
              </svg>
            </button>
            <CloseButton
              className="closeButton"
              width="42px"
              height="42px"
              fill="#FFF"
              clickClose={this.props.clickClose}
            />
          </div>
        </div>
        <ul className={`${this.props.className}-items`}>
          {this.renderfacets()}
        </ul>
        <button className="PillButton reset">
          <ResetIcon
            aria-hidden="true"
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
