import React from 'react';

import GoogleApiLoader from '../actions/googleApiLoader.js';

import Loading from './loading.jsx';

export default class Login extends React.Component {
  
  constructor() {
    super();
    this.state = { loginInProgress: false };
  }
  
  componentDidMount(){
    const { googleApiLoader } = this.props;
    this.updateLoggedIn();
  }

  updateLoggedIn() {
    this.loginInProgress();
    var googleApiLoader = this.props.googleApiLoader;
    var _this = this;
    googleApiLoader
      .getAuth2()
      .currentUser
      .listen(_this.finishLogin.bind(_this));
  }

  finishLogin(user) {
    this.setState({ loginInProgress: false});
    this.props.updateLoggedIn(user);
  }
  
  loginInProgress() {
    this.setState({ loginInProgress: true });
  }

  signin() {
    var googleApiLoader = this.props.googleApiLoader;
    googleApiLoader.signIn();
    this.updateLoggedIn();
  }

  render() {
    if(this.state.loginInProgress){
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
