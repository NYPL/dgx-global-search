import React from 'react';

import { BasicButton } from 'dgx-react-buttons';
import { ApplyIcon, FilterIcon, ResetIcon } from 'dgx-svg-icons';

import CloseButton from '../CloseButton/CloseButton.jsx';
import FilterItem from '../FilterItem/FilterItem.jsx';

// Import libraries
import { map as _map } from 'underscore';
import ClickOut from 'react-onclickout';

class FilterList extends ClickOut {
  constructor(props) {
    super(props);

    this.renderfacets = this.renderfacets.bind(this);
    this.onClickOut = this.onClickOut.bind(this);
    this.onClickApply = this.onClickApply.bind(this);
  }

  /**
   * onClickOut()
   * The function integrates with the parent component, ClickOut, to define the function to close
   * this component if the user clicks outside of the element.
   *
   */
  onClickOut() {
    this.props.onClickClose();
  }

  /**
   * onClickApply()
   * The function applies the facet and makes an AJAX call to fetch new results.
   *
   */
  onClickApply() {
    this.props.onClickClose();
    this.props.onClickApply();
  }

  /**
   * renderfacets()
   * The function renders FilterItem Component with different values of the factes.
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
          onClick={() => this.props.onClickFacet(item.label)}
          label={item.anchor}
        />
      );
    });
  }

  render() {
    const iconGreyOut = (!this.props.selectedFacet) ? '#9C9890' : '#FFF';
    const isGreyOut = (!this.props.selectedFacet) ? 'greyOut' : '';

    return (
      <div
        className={this.props.className}
        onClickOut={this.props.onClickClose}
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
              onClick={this.onClickApply}
            />
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
        <BasicButton
          id="resetButton"
          className={`customButton reset ${isGreyOut}`}
          icon={
            <ResetIcon
              ariaHidden
              className={`${this.props.className}-resetIcon`}
              fill={iconGreyOut}
              height="32"
              title="refresh.icon.svg"
              viewBox="0 0 32 32"
              width="32"
            />
          }
          label="RESET"
          labelAccessible={false}
          onClick={() => this.props.onClickFacet('')}
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
};

FilterList.defaultProps = {
  lang: 'en',
  id: 'filterList',
  className: 'filterList',
  facets: [],
  clickClose: () => {},
};

export default FilterList;
