import React from 'react';
import PropTypes from 'prop-types';

class TabItem extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.links = [];
    this.sections = [];

    const {
      tabs,
      selectedFacet,
    } = this.props;

    this.state = {
      numberOfTabs: tabs.length,
      selectedFacet: selectedFacet,
      selectedFacetAnchor: 'All Results',
    };

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.updateSelectedFacetMobile = this.updateSelectedFacetMobile.bind(this);
  }

  // componentDidMount will set the initial tab, either 1 or the number fetched from the
  // url hash (to accommodate deep linking)
  componentDidMount() {
    let facetName = window.location.href.split("/").pop();
    this.setState({selectedFacet: facetName,  tabNumber: "1"});
  }

  focusTab(newTabIndex) {
    let newTab = this.links[newTabIndex];
    newTab.focus();
  }

  //switches tabs by updating state and href
  switchTab(newTabIndex, tab, tabAnchor, tabId) {
    const {
      saveSelectedTabValue,
      searchBySelectedFacetFunction
    } = this.props;
    saveSelectedTabValue(tabId);
    this.setState({ tabNumber: newTabIndex.toString(), selectedFacet: tab, selectedFacetAnchor: tabAnchor});
    let newTab = this.links[newTabIndex];
    window.location.replace('#_tab' + newTabIndex.toString());
    newTab.focus();
    searchBySelectedFacetFunction(tab);
  }

  clickHandler(e, tabValue, tabAnchor, tabId) {
    e.preventDefault();
    let clickedTab = e.currentTarget;
    let index = clickedTab.getAttribute('data');
    this.switchTab(index, tabValue, tabAnchor, tabId);
  }

  //enables navigation with arrow keys
  keyDownHandler(e, tabValue, tabAnchor, tabId) {
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
      this.clickHandler(e, tabValue, tabAnchor, tabId);
    } else {
      targetTabIndex = null;
    }
    if (targetTabIndex !== null) {
       e.preventDefault();
       if (targetTabIndex !== "down" && targetTabIndex <= numberOfTabs && 0 <= targetTabIndex) {
         this.focusTab(targetTabIndex);
       } else if (targetTabIndex === "down") {
         let nextElement;
         if (document.getElementsByClassName("gs-resultsItem-link")[0]) {
           nextElement = document.getElementsByClassName("gs-resultsItem-link")[0];
         } else {
           nextElement = document.getElementsByClassName("linkItemList")[0].childNodes[0].childNodes[0];
         }
         nextElement.focus();
       }
    }
  }

  updateSelectedFacetMobile(e){
    const {
      searchBySelectedFacetFunction
    } = this.props;
    searchBySelectedFacetFunction(e.target.value);
  }

  renderMobileTabs(array, selectedFacet, tabNumber) {
    const tabArray = [];

    array.forEach((tab, i) => {
      let j = i + 1;

      tabArray.push(
        <option
          key={`${j}`}
          value={tab.value}
          className={(selectedFacet === tab.value ? 'activeTab' : null)}
          href={`#tab${j}`}
          id={`link${j}`}
          tabIndex={!tabNumber ?  '0' : parseInt(tabNumber) === j ? null : -1}
          aria-selected={tabNumber && j === parseInt(tabNumber) ? true: false}
          data={`${j}`}
        >
          {tab.anchor}
        </option>
      )
    });

    return tabArray;
  }

  render() {
    const {
      tabNumber,
      selectedFacet,
      selectedFacetAnchor,
      selectValue
    } = this.state

    const {
      tabs
    } = this.props

    return (
      <div className="tabbed">

        <div id='categoryTextDiv'>
          <label htmlFor='category' id='categoryTextSpan'>Category</label>
        </div>

        <div className="tab-wrapper">
          <select className="form-control input-lg" value={selectValue} onChange={this.updateSelectedFacetMobile} aria-labelledby="categoryTextSpan category" id='category'>
            {this.renderMobileTabs(tabs, selectedFacet, tabNumber)}
          </select>
        </div>

        <ul role='tablist'>
          { tabs.map((tab, i) => {
            let j = i + 1;
            return (
              <li key={`${j}`} value={tab.value} id={`tab${j}`} className={(selectedFacet === tab.value ? 'activeTab' : null)} role='presentation'>
                <a
                  href={`#_tab${j}`}
                  id={`link${j}`}
                  tabIndex={selectedFacet === tab.value ? null : -1}
                  aria-selected={tabNumber && j === parseInt(tabNumber) ? true: false}
                  role='tab'
                  data={`${j}`}
                  onClick={e => this.clickHandler(e, tab.value, tab.anchor, j)}
                  onKeyDown={e => this.keyDownHandler(e, tab.value, tab.anchor, j)}
                  ref={(input) => {this.links[`${j}`] = input;}}
                >
                  {tab.anchor}
                </a>
              </li>
        )
    })
  }
        </ul>
      </div>
  );
  }
}

TabItem.propTypes = {
  tabs: PropTypes.array,
  selectedFacet: PropTypes.string,
  saveSelectedTabValue: PropTypes.func,
  searchBySelectedFacetFunction: PropTypes.func,
};

export default TabItem;
