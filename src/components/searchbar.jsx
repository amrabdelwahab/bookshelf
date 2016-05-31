import React from 'react';

export default class Searchbar extends React.Component {
  
  changeKeyword(){
    var keyword = this.refs.keyword.value;
    this.props.updateKeyword(keyword);
  }

  render() {
    return (
      <div className='searchbar'>
        <input className='search' ref='keyword' onChange={this.changeKeyword.bind(this)} placeholder='Search...'/>
        <span className='ion-search seach-icon'/>
      </div>
    );
  }
}
