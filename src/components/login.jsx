import React from 'react';

import GoogleApiLoader from '../actions/googleApiLoader.js';

import Loading from './loading.jsx';

export default class Login extends React.Component {
  
  signin() {
    var googleApiLoader = this.props.googleApiLoader;
    googleApiLoader.signIn();
  }

  render() {
    if(this.props.loginInProgress){
      return <Loading />
    }
    else {
      return (
        <div className='login-form'>
          <h1>
            <span className='ion-ios-book-outline'/> Welcome to Better Bookshelf <span className='ion-ios-book-outline'/>
          </h1>
          <button className='login' onClick={this.signin.bind(this)}>
            <span className="ion-social-google login-icon"/>
            <span className="login-text">Sign in with google</span>
          </button>
        </div>
      );
    }
  }
}
