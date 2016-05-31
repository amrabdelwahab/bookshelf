import React from 'react';

export default class Searchbar extends React.Component {
  
  changeKeyword(event){
    var keyword = event.target.value;
    this.props.updateKeyword(keyword);
  }

  render() {
    return (
      <div className='searchbar'>
        <input className='search' onChange={this.changeKeyword.bind(this)} placeholder='Search...'/>
        <span className='ion-search seach-icon'/>
      </div>
    );
  }
}
