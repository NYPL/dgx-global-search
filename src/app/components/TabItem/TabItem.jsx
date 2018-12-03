import React from 'react';
import { GenericWedgeIcon } from '@nypl/dgx-svg-icons';

class TabItem extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.links = [];
    this.sections = [];

    this.state = {
      numberOfTabs: this.props.tabs.length,
      selectedFacet: this.props.selectedFacet,
      selectedFacetAnchor: 'All Results'
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
  switchTab(newTabIndex,selectedTab,tabAnchor,tab_id) {
    this.props.selectedTab(tab_id)
    this.setState({ tabNumber: newTabIndex.toString(), selectedFacet: selectedTab, tabValue: selectedTab, selectedFacetAnchor: tabAnchor});
    // this.props.onClickApply(selectedTab);
    let newTab = this.links[newTabIndex];
    window.location.replace('#tab' + newTabIndex.toString());
    newTab.focus();
    this.props.searchBySelectedFacetFunction(selectedTab);
  }

  clickHandler(e,tabValue,tabAnchor,tab_id) {
    e.preventDefault();
    let clickedTab = e.currentTarget;
    let index = clickedTab.getAttribute('data');
    this.switchTab(index,tabValue,tabAnchor,tab_id);
  }

  //enables navigation with arrow keys
  keyDownHandler(e) {
    const index = parseInt(e.currentTarget.getAttribute('data'));
    let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
    if (e.which === 32) {
      e.preventDefault();
      this.clickHandler(e);
    }
    if (dir !== null) {
       e.preventDefault();
       dir === 'down' ? null : dir <= this.state.numberOfTabs && 0 <= dir ? this.focusTab(dir) : void 0;
    }
  }

  updateSelectedFacetMobile(e){
    this.props.searchBySelectedFacetFunction(e.target.value);
  }

  render() {

    let icon = <GenericWedgeIcon className="dropDownIcon" ariaHidden focusable={false} />;

    return (
      <div className="tabbed">

      <div id='categoryTextDiv'>
      <label htmlFor='category' id='categoryTextSpan'>Category</label>
      </div>
      <div id='svg-icon'>
        {icon}
      </div>
      <select value={this.state.selectValue} onChange={this.updateSelectedFacetMobile} aria-labelledby="categoryTextSpan category" id='category'>{this.state.selectedFacetAnchor}
      { this.props.tabs.map((tab, i) => {
        let j = i + 1;
        return (
           <option 
            key={`${j}`}
            value={tab.value}
            className={(this.state.selectedFacet === tab.value ? 'activeTab' : null) }
            href={`#tab${j}`}
            id={`link${j}`}
            tabIndex={!this.state.tabNumber ?  '0' : parseInt(this.state.tabNumber) === j ? null : -1}
            aria-selected={this.state.tabNumber && j === parseInt(this.state.tabNumber) ? true: false}
            role='option'
            data={`${j}`}
             >{tab.anchor}
           </option>
          )
      })
    }
    </select>


    <ul role='tablist'>
    { this.props.tabs.map((tab, i) => {
      let j = i + 1;
      return (
        <li key={`${j}`} value={tab.value} id={`tab${j}`} className={(this.state.selectedFacet === tab.value ? 'activeTab' : null) } role='presentation'>
         <a href={`#tab${j}`}
          id={`link${j}`}
          tabIndex={this.state.selectedFacet === tab.value ? null : -1}
          aria-selected={this.state.tabNumber && j === parseInt(this.state.tabNumber) ? true: false}
          role='tab'
          data={`${j}`}
          onClick={e => this.clickHandler(e,tab.value,tab.anchor,j)}
          onKeyDown={this.keyDownHandler}
          ref={(input) => {this.links[`${j}`] = input;}}
          >{tab.anchor}
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



export default TabItem;
