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
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ isFilterListExpanded: !this.state.isFilterListExpanded });
  }

  generateFilterList() {
    const isActive = (this.state.isFilterListExpanded) ? 'active' : '';

    if (!this.state.isFilterListExpanded) {
      return null;
    }

    return (
      <FilterList
        id={`${this.props.id}-list`}
        className={`${this.props.className}-list`}
        facets={this.props.facets}
        active={isActive}
        clickClose={this.onClick}
      />
    );
  }

  render() {
    return (
      <div
        id={`${this.props.id}-wrapper`}
        className={`${this.props.className}-wrapper`}
      >
        <p>Filter your search:</p>
        <FilterButton
          id={`${this.props.id}-button`}
          className={`${this.props.className}-button`}
          onClick={this.onClick}
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
};

export default Filter;
