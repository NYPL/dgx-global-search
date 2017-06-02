import React from 'react';
import PropTypes from 'prop-types';

import FilterButton from '../FilterButton/FilterButton.jsx';
import FilterList from '../FilterList/FilterList.jsx';

// Import libraries
import ClickOutHandler from 'react-onclickout';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFilterListExpanded: false,
    };

    this.generateFilterList = this.generateFilterList.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickOpen = this.onClickOpen.bind(this);
    this.triggerClose = this.triggerClose.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.triggerClose, false);
  }

  /**
   * onClickClose()
   * Close the filter list.
   *
   */
  onClickClose() {
    this.setState({ isFilterListExpanded: false });
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
   * triggerClose(event)
   * The function listens to the event of esc key.
   * Close the filter modal request if esc is pressed.
   *
   * @param {object} event
   */
  triggerClose(event) {
    if (event) {
      if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
        this.setState({ isFilterListExpanded: false });
      }
    }
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
        onClickApply={this.props.onClickApply}
        isFilterListExpanded={this.state.isFilterListExpanded}
      />
    );
  }

  render() {
    return (
      <ClickOutHandler onClickOut={this.onClickClose}>
        <div
          id={`${this.props.id}-wrapper`}
          className={`${this.props.className}-wrapper`}
        >
          <p>Filter your search:</p>
          <FilterButton
            id={`${this.props.id}-button`}
            className={`${this.props.className}-button`}
            onClick={this.onClickOpen}
          />
          {this.generateFilterList()}
        </div>
      </ClickOutHandler>
    );
  }
}

Filter.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  facets: PropTypes.array,
  selectedFacet: PropTypes.string,
  onClickFacet: PropTypes.func,
  onClickApply: PropTypes.func,
};

Filter.defaultProps = {
  lang: 'en',
  className: 'filter',
  facets: [],
  selectedFacet: '',
};

export default Filter;
