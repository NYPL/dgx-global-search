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
    };

  }

  // componentDidMount will set the initial tab, either 1 or the number fetched from the
  // url hash (to accommodate deep linking)
  componentDidMount() {
    let hashNumber = 1;
    if (this.props.hash) {
      let hash = this.props.hash;
      hashNumber = this.props.hash.match(/[^\d]*(\d)/)[1];
      //window.location.replace(window.location.href + hash);
      let tab = this.links[hashNumber];
      tab.focus();
    }
    this.setState({ tabNumber: hashNumber.toString() });
  }

  focusTab(newTabIndex) {
    let newTab = this.links[newTabIndex];
    newTab.focus();
  }

  //switches tabs by updating state and href
  switchTab(newTabIndex,selectedTab) {
    this.setState({ tabNumber: newTabIndex.toString(), selectedFacet: selectedTab  });
    this.props.onClickApply(selectedTab);
    let newTab = this.links[newTabIndex];
    window.location.replace(window.location.href.split('#')[0] + `#tab${newTabIndex}`);
    newTab.focus();
  }

  clickHandler(e,tabValue) {
    e.preventDefault();
    let clickedTab = e.currentTarget;
    let index = clickedTab.getAttribute('data');
    this.switchTab(index,tabValue);
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


  render() {

     const dropdownSelectedFactet = <li key='3424'> {this.state.selectedFacet} </li> 

    return (
      <div className="tabbed">
        <ul role='tablist'>
        <li key='0' id='tab0'>
          <a id='link0'
          >Category
          </a>
          </li>
          {dropdownSelectedFactet}
          { this.props.tabs.map((tab, i) => {
            let j = i + 1;
            return (

              <li key={`${j}`} id={`tab${j}`} className={(parseInt(this.state.tabNumber) === j ? 'activeTab' : null) } role='presentation'>
                <a href={`#tab${j}`}
                  id={`link${j}`}
                  tabIndex={!this.state.tabNumber ?  '0' : parseInt(this.state.tabNumber) === j ? null : -1}
                  aria-selected={this.state.tabNumber && j === parseInt(this.state.tabNumber) ? true: false}
                  role='tab'
                  data={`${j}`}
                  onClick={e => this.clickHandler(e,tab.value)}
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