import React from 'react';

export default class Searchbar extends React.Component {
 

  render() {
    return (
      <div className='searchbar'>
        <input className='search' placeholder='Search...'/>
        <span className='ion-search seach-icon'/>
      </div>
    );
  }
}
