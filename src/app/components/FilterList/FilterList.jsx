import React from 'react';

import FilterIcon from '../FilterIcon/FilterIcon.jsx';
import CloseButton from '../CloseButton/CloseButton.jsx';

// Import libraries
import { map as _map } from 'underscore';

class FilterList extends React.Component {
  constructor(props) {
    super(props);

    this.renderfacets = this.renderfacets.bind(this);
  }

  renderfacets() {
    return _map(this.props.facets, (item, index) => (
      <li key={index}>{item}</li>
    ));
  }

  render() {
    return (
      <div className={`${this.props.className} ${this.props.active}`}>
        <div className={`${this.props.className}-navigation`}>
          <FilterIcon
            className={`${this.props.className}-icon`}
            width="46px"
            height="46px"
            fill="#FFF"
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
        <div className="reset-wrapper">
          <button className="PillButton reset">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#FFF"
              viewBox="0 0 32 32"
            >
              <title>refresh.icon.svg</title>
              <path
                d={'M10.96075,11l4.60907-3.19434a1,1,0,0,0-1.13965-1.64355L5.939,' +
                  '12.04688l8.83594,6.248a0.99981,0.99981,0,0,0,1.1543-1.63281L10.75061,' +
                  '13H23v8H6a1,1,0,0,0,0,2H25V11H10.96075Z'}
              />
            </svg>
            <span>RESET</span>
          </button>
        </div>
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
