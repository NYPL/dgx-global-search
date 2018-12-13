import React from 'react';
import PropTypes from 'prop-types';

class TabItem extends React.Component {
  constructor(props) {
    super(props);

    this.links = [];
    this.sections = [];

    const  {
      tabs,
      selectedFacet
    } = this.props;

    this.state = {
      numberOfTabs: Array.isArray(tabs) && tabs.length ?
        tabs.length : 0,
      tabs: tabs,
      selectedFacet: selectedFacet
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.updateSelectedFacetMobile = this.updateSelectedFacetMobile.bind(this);
  }

  focusTab(newTabIndex) {
    let newTab = this.links[newTabIndex];

    newTab.focus();
  }

  /**
   * switchTab(newTabIndex, tab, tabId)
   * Switches tabs by updating state and href.
   *
   * @param {int} newTabIndex - The tab number
   * @param {string} tab - The value of the selected tab value
   * @param {string} tabId
   */
  switchTab(newTabIndex, tab, tabId) {
    const {
      saveSelectedTabValue,
      searchBySelectedFacetFunction
    } = this.props;
    saveSelectedTabValue(tabId);
    console.log('switching to tab: ', tab)
    this.setState({ tabNumber: newTabIndex.toString(), selectedFacet: tab });
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
    const {
      numberOfTabs
    } = this.state
    const index = parseInt(e.currentTarget.getAttribute('data'));
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
    if (targetTabIndex !== null) {
       e.preventDefault();
       if (targetTabIndex !== "down" && targetTabIndex <= numberOfTabs && 0 <= targetTabIndex) {
         this.focusTab(targetTabIndex);
       } else if (targetTabIndex === "down") {
         let nextElement;
         if (this.props.resultsOlElement()) {
           nextElement = this.props.resultsOlElement();
         } else {
           nextElement = document.getElementsByClassName("linkItemList")[0].childNodes[0].childNodes[0];
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
  updateSelectedFacetMobile(e){
    const {
      searchBySelectedFacetFunction
    } = this.props;

    console.log('target: ', e.target)
    this.setState({selectedFacet: e.target.value})
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
  renderMobileTabList(tabArray = [], selectedFacet, tabNumber) {
    const tabOptions = [];

    tabArray.forEach((tab, i) => {
      const j = i + 1;
      let tabIndexAttribute;

      if (tabNumber) {
        tabIndexAttribute = (parseInt(tabNumber) === j) ? null : '-1';
      } else {
        tabIndexAttribute = '0';
      }

      tabOptions.push(
        <option
          key={j}
          value={tab.value}
          className={(selectedFacet === tab.value) ? 'activeTab' : null}
          href={`#tab${j}`}
          id={`mobile-tab-link${j}`}
          tabIndex={tabIndexAttribute}
          aria-selected={(tabNumber && j === parseInt(tabNumber)) ? 'true' : 'false'}
          data={j}
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
          aria-labelledby="categoryTextSpan category"
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
  * @param {number} tabNumber - The number of each tab
  * @return {HTML Element} - The HTML element of the tab list on the desktop view
  */
  renderDesktopTabList(tabArray = [], selectedFacet, tabNumber) {
    const tabItems = [];
    tabArray.forEach((tab, i) => {
      let j = i + 1;
      console.log('tab: ', j, tab.value)
      tabItems.push(
        <li
          key={j}
          value={tab.value}
          id={`tab${j}`}
          className={(selectedFacet === tab.value ? 'activeTab' : null)}
          role='presentation'
        >
          <a
            href={`#_tab${j}`}
            id={`link${j}`}
            tabIndex={(selectedFacet === tab.value) ? null : -1}
            aria-selected={(tabNumber && j === parseInt(tabNumber)) ? 'true' : 'false'}
            role='tab'
            data={j}
            onClick={e => this.clickHandler(e, tab.value, tab.anchor, j)}
            onKeyDown={e => this.keyDownHandler(e, tab.value, j)}
            ref={(input) => {this.links[j.toString()] = input;}}
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
  * renderContentOfTabLists(tabArray = [], selectedFacet, tabNumber)
  * Calls the two functions to render tab lists on different viewports.
  *
  * @param {array} tabArray - The array of the tabs
  * @param {string} selectedFacet - The facet that is selected
  * @param {number} tabNumber - The number of each tab
  * @return {HTML Element} - The HTML element that contains both of the tab lists
  */
  renderContentOfTabLists(tabArray = [], selectedFacet, tabNumber) {
    if (!tabArray.length) {
      return null;
    }

    return (
      <div>
        <label id='categoryTextLabel'>Category</label>
        {this.renderMobileTabList(tabArray, selectedFacet, tabNumber)}
        {this.renderDesktopTabList(tabArray, selectedFacet, tabNumber)}
      </div>
    );
  }

  render() {

    const {
      tabNumber,
      tabs,
      selectedFacet,
    } = this.state

    return (
      <div className="tabsContainer">
        {this.renderContentOfTabLists(tabs, selectedFacet, tabNumber)}
      </div>
    );
  }
}

TabItem.propTypes = {
  tabs: PropTypes.array,
  selectedFacet: PropTypes.string,
  saveSelectedTabValue: PropTypes.func,
  searchBySelectedFacetFunction: PropTypes.func,
  resultsOlElement: PropTypes.func,
};

export default TabItem;
