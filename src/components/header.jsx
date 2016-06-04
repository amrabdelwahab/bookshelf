import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div className='header'>
        <div className='user-panel'>
          <div className="dropdown">
            <button className="dropbtn">
              <span className='email'>
              <span className='ion-person'/> {this.props.user.getEmail()}
              </span>
              <span className='down ion-ios-arrow-down'/>
            </button>
            <div className="dropdown-content">
              <a onClick={this.props.logout} href="#">logout</a>
            </div>
          </div> 
         </div>
        <h1> Bookshelf <span className='ion-ios-book-outline'/></h1>     
      </div>
    );
  }
}
