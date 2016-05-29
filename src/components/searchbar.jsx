import React from 'react';

export default class Searchbar extends React.Component {
 

  render() {
    return (
      <div className='searchbar'>
          <span className='ion-search seach-icon'/>
        <input className='search' placeholder='Search...'/>
      </div>
    );
  }
}
