import React from 'react';

import Searcher from '../actions/searcher.js'
import GoogleApiLoader from '../actions/googleApiLoader.js';

import Login from './login.jsx';
import Header from './header.jsx';
import BooksPanel from './bookspanel.jsx';
import Searchbar from './searchbar.jsx';
import Loading from './loading.jsx';

export default class App extends React.Component {

  constructor() {
    super();
    this.googleApiLoader = new GoogleApiLoader();
    this.state = {
      books: {},
      tags: ['ruby', 'design'],
      keyword:'',
      finishedLoading: false,
      isLoggedIn: false,
      loginInProgress: true
    };
  }



  componentDidMount(){
    this.googleApiLoader.authLoaded(this.finishedLoading.bind(this));

  }  

  finishedLoading() {
    this.setState({finishedLoading: true});
    this.googleApiLoader.onLoggedInChange(this.updateLoggedIn.bind(this));
  }


  updateLoggedIn(user) {
    if (this.googleApiLoader.getAuth2().isSignedIn.get()){
      var profile = user.getBasicProfile();
      this.setState({
        loggedInUser: profile,
        isLoggedIn: true,
      });
    }
    else {
      this.setState({
        loggedInUser: {},
        isLoggedIn: false,
      });
    }
    this.finishLogin();
  }

  loginInProgress() {
    this.setState({ loginInProgress: true });
  }

  finishLogin() {
    this.setState({ loginInProgress: false});
  }

  saveBook(book) {
    var id = new Date().getTime();
    this.state.books['book-' + id] = book;
    this.setState({books: this.state.books})
  }

  updateKeyword(keyword) {
    this.setState({keyword: keyword});
  }

  getResults() {
    const{ books } = this.state;
    const{ keyword } = this.state;
    return new Searcher(keyword, books).getResults();
  }

  renderApp() {
    if(this.state.isLoggedIn) {
      return this.renderMainPanel();
    }
    else {
      return <Login googleApiLoader={this.googleApiLoader}
                    updateLoggedIn={this.updateLoggedIn.bind(this)}
                    loginInProgress={this.state.loginInProgress}/>
    }
  }

  logout(e){
    e.preventDefault();
    this.googleApiLoader.signOut();
  }

  renderMainPanel() {
    return (
    <div className='app'>
         <Header user={this.state.loggedInUser} logout={this.logout.bind(this)} />
         <div className='main-panel'>
           <Searchbar updateKeyword={this.updateKeyword.bind(this)}/>
           <BooksPanel saveBook={this.saveBook.bind(this)}
                       perPage={11}
                       books={this.getResults()}/>
         </div>
       </div>
    );
  }

  render() {
    if(this.state.finishedLoading){
      return this.renderApp()
    }
    else {
      return <Loading/>
    }
  }
}

