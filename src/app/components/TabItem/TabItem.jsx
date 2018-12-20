import React from 'react';
import PropTypes from 'prop-types';
import getNumberForFacet from '../../utils/TabIndex';
// Import alt components
import Store from '../../stores/Store';

class TabItem extends React.Component {
  constructor(props) {
    super(props);

    this.links = [];
    this.sections = [];

    const {
      tabs,
      selectedFacet,
    } = this.props;

    this.state = {
      numberOfTabs: Array.isArray(tabs) && tabs.length
        ? tabs.length : 0,
      tabs,
      tabNumber: getNumberForFacet(selectedFacet),
      selectedFacet,
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

  focusTab(newTabIndex) {
    const newTab = this.links[newTabIndex];
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
      searchBySelectedFacetFunction,
    } = this.props;
    const newTab = this.links[newTabIndex];

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
    const clickedTab = e.currentTarget;
    const index = clickedTab.getAttribute('data');
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
    const {
      numberOfTabs,
    } = this.state;
    const {
      resultsOlElement,
    } = this.props;
    const index = parseInt(e.currentTarget.getAttribute('data'), 10);
    let targetTabIndex;

    // 37 is left
    if (e.which === 37) {
      targetTabIndex = index - 1;
    } else if (e.which === 39) {
    // 39 is right
      targetTabIndex = index + 1;
    } else if (e.which === 40) {
    // 40 is down
      targetTabIndex = 'down';
    } else if (e.which === 32) {
      // 32 is the space key
      e.preventDefault();
      this.clickHandler(e, tabValue, tabId);
    } else {
      targetTabIndex = null;
    }

    if (targetTabIndex !== null && targetTabIndex > 0) {
      e.preventDefault();
      if (targetTabIndex !== 'down' && targetTabIndex <= numberOfTabs && targetTabIndex >= 0) {
        this.focusTab(targetTabIndex);
      } else if (targetTabIndex === 'down') {
        let nextElement;
        if (resultsOlElement()) {
          nextElement = resultsOlElement();
        } else {
          nextElement = document.getElementsByClassName('linkItemList')[0].childNodes[0]
            .childNodes[0];
        }
        nextElement.focus();
      }
    }
  }

  /**
  * updateSelectedFacetMobile(e)
  * Updates the facet on mobile view when a tab is selected.
  *
  * @param {event} e - The event when a tab is clicked
  */
  updateSelectedFacetMobile(e) {
    const {
      searchBySelectedFacetFunction,
    } = this.props;

    searchBySelectedFacetFunction(e.target.value);
  }

  /**
  * renderMobileTabList(tabArray, selectedFacet, tabNumber)
  * Renders the tab list on the mobile view.
  *
  * @param {array} tabArray - The array of the tabs
  * @param {string} selectedFacet - The facet that is selected
  * @param {number} tabNumber - The number of each tab
  * @return {HTML Element} - The HTML element of the tab list on the mobile view
  */
  renderMobileTabList(tabArray = [], selectedFacet) {
    const tabOptions = [];
    const {
      tabNumber,
    } = this.state;

    tabArray.forEach((tab, i) => {
      const j = i + 1;
      let tabIndexAttribute;

      if (tabNumber) {
        tabIndexAttribute = (parseInt(tabNumber, 10) === j) ? null : '-1';
      } else {
        tabIndexAttribute = '0';
      }

      const option = (
        <option
          key={j}
          value={tab.value}
          className={(selectedFacet === tab.value) ? 'activeTab' : null}
          href={`#tab${j}`}
          id={`mobile-tab-link${j}`}
          tabIndex={tabIndexAttribute}
          aria-selected={(selectedFacet === tab.value) ? 'true' : 'false'}
          data={j}
        >
          {tab.anchor}
        </option>
      );

      tabOptions.push(option);
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
  * renderDesktopTabList(tabArray, selectedFacet, tabNumber)
  * Renders the tab list on the desktop view.
  *
  * @param {array} tabArray - The array of the tabs
  * @param {string} selectedFacet - The facet that is selected
  * @return {HTML Element} - The HTML element of the tab list on the desktop view
  */
  renderDesktopTabList(tabArray = [], selectedFacet) {
    const tabItems = [];

    tabArray.forEach((tab, i) => {
      const j = i + 1;
      const listItem = (
        <li
          key={j}
          value={tab.value}
          id={`tab${j}`}
          className={(selectedFacet === tab.value ? 'activeTab' : null)}
          role="presentation"
        >
          <a
            href={`#_tab${j}`}
            id={`link${j}`}
            tabIndex={(selectedFacet === tab.value) ? null : -1}
            aria-selected={(selectedFacet === tab.value) ? 'true' : 'false'}
            role="tab"
            data={j}
            onClick={e => this.clickHandler(e, tab.value, tab.anchor, j)}
            onKeyDown={e => this.keyDownHandler(e, tab.value, j)}
            ref={(input) => { this.links[j.toString()] = input; }}
          >
            {tab.anchor}
          </a>
        </li>
      );

      tabItems.push(listItem);
    });

    return (
      <ul role="tablist">
        {tabItems}
      </ul>
    );
  }

  /**
  * renderContentOfTabLists(tabArray = [], selectedFacet, tabNumber)
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
        <label id="categoryTextLabel" htmlFor="category">Category</label>
        {this.renderMobileTabList(tabArray, selectedFacet)}
        {this.renderDesktopTabList(tabArray, selectedFacet)}
      </div>
    );
  }

  render() {
    const {
      tabs,
      selectedFacet,
    } = this.state;

    return (
      <div className="tabsContainer">
        {this.renderContentOfTabLists(tabs, selectedFacet)}
      </div>
    );
  }
}

TabItem.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object),
  selectedFacet: PropTypes.string,
  searchBySelectedFacetFunction: PropTypes.func,
  resultsOlElement: PropTypes.func,
};

TabItem.defaultProps = {
  tabs: [],
  selectedFacet: '',
  searchBySelectedFacetFunction: () => {},
  resultsOlElement: () => {},
};

export default TabItem;
