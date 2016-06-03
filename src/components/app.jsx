import React from 'react';

import Searcher from '../actions/searcher.js'
import GoogleApiLoader from '../actions/googleApiLoader.js';

import Header from './header.jsx';
import BooksPanel from './bookspanel.jsx';
import Searchbar from './searchbar.jsx';
import Loading from './loading.jsx';

export default class App extends React.Component {

  constructor() {
    super();

    this.state = {
      books: {},
      tags: ['ruby', 'design'],
      keyword:''
    };
  }

  componentDidMount(){
    var googleApiLoader = new GoogleApiLoader();
    var _this = this;
    googleApiLoader.authLoaded(function () {
      googleApiLoader.getAuth2().currentUser.listen(function (user) {
        _this.setState({finishedLoading: true});
        
        if (user.getBasicProfile()) {
          var profile = user.getBasicProfile();
          var profileProxy = {};
          profileProxy.id = profile.getId();
          profileProxy.name = profile.getName();
          profileProxy.thumb = profile.getImageUrl();
          profileProxy.email = profile.getEmail();
          _this.setState({loggedInUser: profileProxy});
        }
        _this.setState({isLoggedIn: user.getBasicProfile() ? true : false});
      });


    });
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
      return <div> sign in </div>
    }
  }
  else {
    return <Loading/>
  }
}
}

