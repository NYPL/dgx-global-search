import React from 'react';

class TabItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfTabs: this.props.tabs.length,
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.links = [];
    this.sections = [];

    this.state = {
      selectedFacet: this.props.selectedFacet,
      selectedFacetAnchor: 'All Results',
      mobileFilterExpanded: false
    };

      this.mobileHandler = this.mobileHandler.bind(this);

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
  switchTab(newTabIndex,selectedTab,tabAnchor) {
    this.setState({ tabNumber: newTabIndex.toString(), selectedFacet: selectedTab, tabValue: selectedTab, selectedFacetAnchor: tabAnchor});
    this.props.onClickApply(selectedTab);
    let newTab = this.links[newTabIndex];
    window.location.replace(window.location.href.split('#')[0] + `#tab${newTabIndex}`);
    newTab.focus();
  }

  clickHandler(e,tabValue,tabAnchor) {
    e.preventDefault();
    let clickedTab = e.currentTarget;
    let index = clickedTab.getAttribute('data');
    this.switchTab(index,tabValue,tabAnchor);
  }

  //enables navigation with arrow keys
  keyDownHandler(e) {
    let panel = window.location.href.split("#")[1] ? this.sections[this.state.tabNumber] : this.default;
    const index = parseInt(e.currentTarget.getAttribute('data'));
    let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
    if (e.which === 32) {
      e.preventDefault();
      this.clickHandler(e);
    }
    if (dir !== null) {
      e.preventDefault();
      dir === 'down' ? panel.focus() : dir <= this.state.numberOfTabs && 0 <= dir ? this.focusTab(dir) : void 0;
    }
  }

  mobileHandler(){
      const currentState = this.state.mobileFilterExpanded;
      this.setState({ mobileFilterExpanded: !currentState });
  }


  render() {


    return (
      <div className="tabbed">

      <div id='categoryTextDiv'>
      <span id='categoryTextSpan'>Category</span>
      </div>

      <div onClick={this.mobileHandler} id="mobile-dropdown" className={this.state.mobileFilterExpanded ? "wrapper-dropdown active": "wrapper-dropdown"}  tabIndex="1">
      <span>{this.state.selectedFacetAnchor}</span>
      <ul className="dropdown">

      { this.props.tabs.map((tab, i) => {
        let j = i + 1;
        return (
          <li key={`${j}`} className={(parseInt(this.state.tabNumber) === j ? 'activeTab' : null) } >
           <a href={`#tab${j}`}
            id={`link${j}`}
            tabIndex={!this.state.tabNumber ?  '0' : parseInt(this.state.tabNumber) === j ? null : -1}
            aria-selected={this.state.tabNumber && j === parseInt(this.state.tabNumber) ? true: false}
            role='tab'
            data={`${j}`}
            onClick={e => this.clickHandler(e,tab.value,tab.anchor)}
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


    <ul role='tablist'>
    { this.props.tabs.map((tab, i) => {
      let j = i + 1;
      return (
        <li key={`${j}`} value={tab.value} id={`tab${j}`} className={(this.state.selectedFacet === tab.value ? 'activeTab' : null) } role='presentation'>
         <a href={`#tab${j}`}
          id={`link${j}`}
          tabIndex={!this.state.tabNumber ?  '0' : parseInt(this.state.tabNumber) === j ? null : -1}
          aria-selected={this.state.tabNumber && j === parseInt(this.state.tabNumber) ? true: false}
          role='tab'
          data={`${j}`}
          onClick={e => this.clickHandler(e,tab.value,tab.anchor)}
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