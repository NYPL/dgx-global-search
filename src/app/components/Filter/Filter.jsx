import React from 'react';

import FilterButton from '../FilterButton/FilterButton.jsx';
import FilterList from '../FilterList/FilterList.jsx';

// Import libraries
import ClickOut from 'react-onclickout';

class Filter extends ClickOut {
  constructor(props) {
    super(props);

    this.state = {
      isFilterListExpanded: false,
    };

    this.generateFilterList = this.generateFilterList.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickOpen = this.onClickOpen.bind(this);
    this.onClickOut = this.onClickOut.bind(this);
  }

  /**
   * onClickOut()
   * The function integrates with the parent component, ClickOut, to define the function to close
   * this component if the user clicks outside of the element.
   *
   */
  onClickOut() {
    this.onClickClose();
  }

  /**
   * onClickClose()
   * Close the filter list.
   *
   */
  onClickClose() {
    this.setState({ isFilterListExpanded: false});
  }

  /**
   * onClickOpen()
   * Open the filter list.
   *
   */
  onClickOpen() {
    this.setState({ isFilterListExpanded: true });
  }

  /**
   * generateFilterList()
   * The function generate <FilterList> based on the state of isFilterListExpanded.
   * If the state is true, it will generate the object.
   *
   * @return null or object
   */
  generateFilterList() {
    const showFilter = (this.state.isFilterListExpanded) ? 'show-filter' : '';

    return (
      <FilterList
        id={`${this.props.id}-list`}
        className={`${showFilter} ${this.props.className}-list`}
        facets={this.props.facets}
        selectedFacet={this.props.selectedFacet}
        onClickClose={this.onClickClose}
        onClickFacet={this.props.onClickFacet}
        onClickDashCircle={this.props.onClickDashCircle}
        isFilterListExpanded={this.state.isFilterListExpanded}
      />
    );
  }

  render() {
    return (
      <div
        id={`${this.props.id}-wrapper`}
        className={`${this.props.className}-wrapper`}
        onClickOut={this.onClickClose}
      >
        <p>Filter your search:</p>
        <FilterButton
          id={`${this.props.id}-button`}
          className={`${this.props.className}-button`}
          onClick={this.onClickOpen}
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
