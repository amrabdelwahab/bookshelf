import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div className='header'>
        <h1> Bookshelf <span className='ion-ios-book-outline'></span></h1>
      </div>
    );
  }
}
