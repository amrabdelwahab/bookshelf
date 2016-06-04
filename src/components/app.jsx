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
      isLoggedIn: false
    };
  }



  componentDidMount(){
    this.googleApiLoader.authLoaded(this.finishedLoading.bind(this));
  }  

  finishedLoading() {
    this.setState({finishedLoading: true});
  }


  updateLoggedIn(user) {
    if (user.getBasicProfile()) {
      var profile = user.getBasicProfile();
      var profileProxy = {};
      profileProxy.id = profile.getId();
      profileProxy.name = profile.getName();
      profileProxy.thumb = profile.getImageUrl();
      profileProxy.email = profile.getEmail();
      this.setState({
        loggedInUser: profileProxy,
        isLoggedIn: true,
      });
    }
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

  getGoogleApiLoader() {
    return this.googleApiLoader;
  }

 render() {
  if(this.state.finishedLoading){
    if(this.state.isLoggedIn) {
      return (
       <div className='app'>
       <Header user={this.state.loggedInUser} />
       <div className='main-panel'>
       <Searchbar updateKeyword={this.updateKeyword.bind(this)}/>
       <BooksPanel saveBook={this.saveBook.bind(this)}
                   perPage={11}
                   books={this.getResults()}/>
       </div>
       </div>
       )
    }
    else {
      return <Login googleApiLoader={this.getGoogleApiLoader()}
                    updateLoggedIn={this.updateLoggedIn.bind(this)}/>
    }
  }
  else {
    return <Loading/>
  }
}
}

