import React from 'react';

import { FilterIcon } from 'dgx-svg-icons';

import CloseButton from '../CloseButton/CloseButton.jsx';
import ApplyButton from '../ApplyButton/ApplyButton.jsx';
import FilterItem from '../FilterItem/FilterItem.jsx';

// Import libraries
import { map as _map } from 'underscore';

class FilterList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFacet: this.props.selectedFacet,
    };

    this.renderfacets = this.renderfacets.bind(this);
    this.onClickApply = this.onClickApply.bind(this);
    this.onClickFacet = this.onClickFacet.bind(this);
  }

  /**
   * onClickApply()
   * The function applies the newly clicked facet to FilterItem for its click function,
   * if the applied facet equals to the previous facet, it resets the current facet to null.
   *
   */
  onClickApply() {
    this.props.onClickClose();
    this.props.onClickApply(this.state.selectedFacet);
  }

  onClickFacet(clickedFacet) {
    if (clickedFacet === this.state.selectedFacet) {
      this.setState({ selectedFacet: '' });
    } else {
      this.setState({ selectedFacet: clickedFacet });
    }
  }

  /**
   * renderfacets()
   * The function renders FilterItem Component with different values of the facets.
   *
   */
  renderfacets() {
    return _map(this.props.facets, (item, index) => {
      const isSelected = (item.value === this.state.selectedFacet) ? 'selected' : '';

      return (
        <FilterItem
          className={isSelected}
          key={index}
          onClick={() => this.onClickFacet(item.value)}
          label={item.anchor}
          name={item.label}
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
          <h2>Filter by</h2>
          <fieldset className={`${this.props.className}-items`}>
            <legend className="visuallyHidden">Choose a filter from the filter list</legend>
            {this.renderfacets()}
          </fieldset>
          <div className={`${this.props.className}-buttonWrapper`}>
            <div className={`${this.props.className}-applyButton-wrapper`}>
              <ApplyButton
                id={`${this.props.id}-applyButton`}
                className={`customButton ${this.props.className}-applyButton`}
                onClick={() => this.onClickApply()}
                height="32"
                title="checkSolo.icon.svg"
                viewBox="0 0 32 32"
                width="32"
                ariaHidden
              />
            </div>
            <CloseButton
              id={`${this.props.id}-closeButton`}
              className={`customButton ${this.props.className}-closeButton`}
              onClick={this.props.onClickClose}
              fill="#FFF"
              height="32"
              title="x.icon.svg"
              viewBox="0 0 32 32"
              width="32"
              ariaHidden
            />
          </div>
        </div>
      </div>
    );
  }
}

FilterList.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  facets: React.PropTypes.array,
  selectedFacet: React.PropTypes.string,
  onClickClose: React.PropTypes.func,
  onClickFacet: React.PropTypes.func,
};

FilterList.defaultProps = {
  lang: 'en',
  className: 'filterList',
  facets: [],
};

export default FilterList;
