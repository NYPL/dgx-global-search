import React from 'react';

import { FilterIcon } from 'dgx-svg-icons';

import CloseButton from '../CloseButton/CloseButton.jsx';
import FilterItem from '../FilterItem/FilterItem.jsx';

// Import libraries
import { map as _map } from 'underscore';

class FilterList extends React.Component {
  constructor(props) {
    super(props);

    this.renderfacets = this.renderfacets.bind(this);
    this.onClickApply = this.onClickApply.bind(this);
  }

  /**
   * onClickApply()
   * The function applies the facet and makes an AJAX call to fetch new results.
   *
   */
  onClickApply(facet) {
    this.props.onClickClose();
    this.props.onClickFacet(facet);
  }

  /**
   * renderfacets()
   * The function renders FilterItem Component with different values of the facets.
   *
   */
  renderfacets() {
    return _map(this.props.facets, (item, index) => {
      const isSelected = (item.label === this.props.selectedFacet) ?
        'selected' : '';

      return (
        <FilterItem
          className={isSelected}
          key={index}
          onClick={() => this.onClickApply(item.label)}
          onClickDashCircle={() => this.onClickApply('')}
          label={item.anchor}
        />
      );
    });
  }

  render() {
    return (
      <div className={this.props.className}>
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
            <CloseButton
              id={`${this.props.id}-closeButton`}
              className={`customButton ${this.props.className}-closeButton`}
              onClick={this.props.onClickClose}
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
      </div>
    );
  }
}

FilterList.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  facets: React.PropTypes.array,
  clickClose: React.PropTypes.func,
};

FilterList.defaultProps = {
  lang: 'en',
  className: 'filterList',
  facets: [],
};

export default FilterList;
