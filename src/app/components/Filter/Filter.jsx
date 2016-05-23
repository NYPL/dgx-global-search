import React from 'react';

import FilterButton from '../FilterButton/FilterButton.jsx';
import FilterList from '../FilterList/FilterList.jsx';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFilterListExpanded: false,
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ isFilterListExpanded: !this.state.isFilterListExpanded });
  }

  render() {
    const isActive = (this.state.isFilterListExpanded) ? 'active' : '';

    return (
      <div className={`${this.props.className}Wrapper`}>
        <p>Filter your search:</p>
        <FilterButton className={`${this.props.className}Icon`} onClick={this.onClick} />
        <FilterList
          className={`${this.props.className}List`}
          facets={this.props.facets}
          active={isActive}
          clickClose={this.onClick}
        />
      </div>
    );
  }
};

Filter.propTypes = {
  className: React.PropTypes.string,
};

export default Filter;
