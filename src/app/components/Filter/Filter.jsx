import React from 'react';

import FilterButton from '../FilterButton/FilterButton.jsx';
import FilterList from '../FilterList/FilterList.jsx';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFilterListExpanded: false,
    };

    this.generateFilterList = this.generateFilterList.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
  }

  /**
   * onClickClose()
   * Toggle the filter list.
   *
   */
  onClickClose() {
    this.setState({ isFilterListExpanded: !this.state.isFilterListExpanded });
  }

  /**
   * generateFilterList()
   * The function generate <FilterList> based on the state of isFilterListExpanded.
   * If the state is true, it will generate the object.
   *
   * @return null or object
   */
  generateFilterList() {
    if (this.state.isFilterListExpanded) {
      return (
        <FilterList
          id={`${this.props.id}-list`}
          className={`${this.props.className}-list`}
          facets={this.props.facets}
          selectedFacet={this.props.selectedFacet}
          onClickClose={this.onClickClose}
          onClickFacet={this.props.onClickFacet}
          // onClickApply={this.props.onClickApply}
        />
      );
    }

    return null;
  }

  render() {
    const isFilterOpen = (this.state.isFilterListExpanded) ? 'filter-open' : '';

    return (
      <div
        id={`${this.props.id}-wrapper`}
        className={`${this.props.className}-wrapper ${isFilterOpen}`}
      >
        <p>Filter your search:</p>
        <FilterButton
          id={`${this.props.id}-button`}
          className={`${this.props.className}-button`}
          onClick={this.onClickClose}
        />
        {this.generateFilterList()}
      </div>
    );
  }
}

Filter.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  facets: React.PropTypes.array,
  selectedFacet: React.PropTypes.string,
  onClickFacet: React.PropTypes.func,
  onClickApply: React.PropTypes.func,
};

Filter.defaultProps = {
  lang: 'en',
  className: 'filter',
  facets: [],
  selectedFacet: '',
};

export default Filter;
