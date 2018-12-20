import React from 'react';
import PropTypes from 'prop-types';
import { getNameForFacet, incrementTab, displayNameForFacet } from '../../utils/TabIndex.js'
// Import alt components
import Store from '../../stores/Store.js';

class TabItem extends React.Component {
  constructor(props) {
    super(props);

    this.links = [];
    this.sections = [];

    const {
      tabs,
      selectedFacet
    } = this.props;

    this.state = {
      tabs: tabs,
      selectedFacet: selectedFacet,
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.updateSelectedFacetMobile = this.updateSelectedFacetMobile.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // Listen to any change of the Store
    Store.listen(this.onChange);
  }

  componentWillUnmount() {
    // Stop listening to the Store
    Store.unlisten(this.onChange);
  }

  onChange() {
    // Updates the state with the new search data
    this.setState({
      selectedFacet: Store.getState().selectedFacet,
    });
  }

  focusTab(newTabName) {
    let newTab = this.links[newTabName];
    newTab.focus();
  }

  /**
   * switchTab(newTabIndex, tab)
   * Switches tabs by updating state and href.
   *
   * @param {int} newTabIndex - The tab number
   * @param {string} tab - The value of the selected tab value
   */
  switchTab(newTabIndex, tab) {
    const {
      searchBySelectedFacetFunction
    } = this.props;
    let newTab = this.links[newTabIndex];
    newTab.focus();
    searchBySelectedFacetFunction(tab);
  }

  /**
   * clickHandler(e, tabValue, tabId)
   * Calls the function switchTab after a key is pressed.
   *
   * @param {event} e - The input event
   * @param {string} tabValue - The value of the selected tab value
   * @param {string} tabId
   */
  clickHandler(e, tabValue, tabId) {
    e.preventDefault();
    let clickedTab = e.currentTarget;
    let index = clickedTab.getAttribute('data');
    this.switchTab(index, tabValue, tabId);
  }

  /**
   * keyDownHandler(e, tabValue, tabId)
   * Enables navigation with arrow keys.
   *
   * @param {event} e - The key down event
   * @param {string} tabValue
   * @param {string} tabId
  */
  keyDownHandler(e, tabValue, tabId) {
    const name = e.currentTarget.getAttribute('data');
    let targetTabName;
    // 37 is left
    if (e.which === 37) {
      targetTabName = incrementTab(name, -1);
    } else if (e.which === 39) {
    // 39 is right
      targetTabName = incrementTab(name, 1);
    } else if (e.which === 32) {
      // 32 is the space key
      e.preventDefault();
      this.clickHandler(e, tabValue, tabId);
    } else {
      targetTabName = null;
    }
    if (targetTabName !== null) {
       e.preventDefault();
       this.focusTab(targetTabName);
    }
  }

  /**
  * updateSelectedFacetMobile(e)
  * Updates the facet on mobile view when a tab is selected.
  *
  * @param {event} e - The event when a tab is clicked
  */
  updateSelectedFacetMobile(e){
    const {
      searchBySelectedFacetFunction
    } = this.props;

    searchBySelectedFacetFunction(e.target.value);
  }

  /**
  * renderMobileTabList(tabArray, selectedFacet)
  * Renders the tab list on the mobile view.
  *
  * @param {array} tabArray - The array of the tabs
  * @param {string} selectedFacet - The facet that is selected
  * @return {HTML Element} - The HTML element of the tab list on the mobile view
  */
  renderMobileTabList(tabArray = [], selectedFacet) {
    const tabOptions = [];
    tabArray.forEach(tab => {
      const name = getNameForFacet(tab.value);
      const display = displayNameForFacet(tab.value)
      let tabIndexAttribute = tab.value === selectedFacet;
      tabOptions.push(
        <option
          key={name}
          value={name}
          className={(selectedFacet === name) ? 'activeTab' : null}
          href={`#tab_${display}`}
          id={`mobile-tab-link-${display}`}
          tabIndex={tabIndexAttribute}
          aria-selected={(selectedFacet === name) ? 'true' : 'false'}
          data={name}
        >
          {tab.anchor}
        </option>
      );
    });

    return (
      <div className="tab-wrapper">
        <select
          className="form-control input-lg"
          value={selectedFacet}
          onChange={this.updateSelectedFacetMobile}
          aria-labelledby="categoryTextLabel"
          id="category"
        >
          {tabOptions}
        </select>
      </div>
    );
  }

  /**
  * renderDesktopTabList(tabArray, selectedFacet)
  * Renders the tab list on the desktop view.
  *
  * @param {array} tabArray - The array of the tabs
  * @param {string} selectedFacet - The facet that is selected
  * @return {HTML Element} - The HTML element of the tab list on the desktop view
  */
  renderDesktopTabList(tabArray = [], selectedFacet) {
    const tabItems = [];
    tabArray.forEach(tab => {
      let name = getNameForFacet(tab.value);
      let display = displayNameForFacet(tab.value);

      tabItems.push(
        <li
          key={name}
          value={name}
          id={`tab_${display}`}
          className={(selectedFacet === name ? 'activeTab' : null)}
          role='presentation'
        >
          <a
            href={`#_tab_${display}`}
            id={`link_${display}`}
            tabIndex={(selectedFacet === name) ? null : -1}
            aria-selected={(selectedFacet === name) ? 'true' : 'false'}
            role='tab'
            data={name}
            onClick={e => this.clickHandler(e, name, tab.anchor)}
            onKeyDown={e => this.keyDownHandler(e, name, tab.anchor)}
            ref={(input) => {this.links[name] = input;}}
          >
            {tab.anchor}
          </a>
        </li>
      );
    });

    return (
      <ul role='tablist'>
        {tabItems}
      </ul>
    );
  }

  /**
  * renderContentOfTabLists(tabArray = [], selectedFacet)
  * Calls the two functions to render tab lists on different viewports.
  *
  * @param {array} tabArray - The array of the tabs
  * @param {string} selectedFacet - The facet that is selected
  * @return {HTML Element} - The HTML element that contains both of the tab lists
  */
  renderContentOfTabLists(tabArray = [], selectedFacet) {
    if (!tabArray.length) {
      return null;
    }

    return (
      <div>
        <label id='categoryTextLabel'>Category</label>
        {this.renderMobileTabList(tabArray, selectedFacet)}
        {this.renderDesktopTabList(tabArray, selectedFacet)}
      </div>
    );
  }

  render() {
    const {
      tabs,
    } = this.state

    return (
      <div className="tabsContainer">
        {this.renderContentOfTabLists(tabs, this.state.selectedFacet)}
      </div>
    );
  }
}

TabItem.propTypes = {
  tabs: PropTypes.array,
  selectedFacet: PropTypes.string,
  searchBySelectedFacetFunction: PropTypes.func,
  resultsOlElement: PropTypes.func,
};

export default TabItem;
