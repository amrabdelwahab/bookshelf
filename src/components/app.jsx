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
    var googleApiLoader = new GoogleApiLoader();
    
    this.state = {
      books: {},
      tagsSuggestions: ['ruby', 'design', 'test', 'elixir'],
      keyword:'',
      finishedLoading: false,
      isLoggedIn: false,
      authenticationInProgress: true,
      googleApiLoader: googleApiLoader
    };
  }

/*
After the component mounts add the method finished loading as a callback 
to authloaded in the google api loader instance
*/
  componentDidMount(){
    this.state.googleApiLoader.authLoaded(this.finishedLoading.bind(this));
  } 

/*
This is the callback triggered when the auth library is loaded and 
it sets a callback to any change in the loggedin state
*/
  finishedLoading() {
    this.setState({finishedLoading: true});
    this.state.googleApiLoader.onLoggedInChange(this.updateLoggedIn.bind(this));
  }

/*
  This method is the callback at any change in the logged in state
*/
  updateLoggedIn(user) {
    if (this.state.googleApiLoader.getAuth2().isSignedIn.get()){
      this.afterLogin(user);
    }
    else {
      this.afterLogout();
    }
    this.finishAuthenticationInProgress();
  }

/*
  This method is updates the state after login
*/
  afterLogin(user) {
    var profile = user.getBasicProfile();
    this.setState({
      loggedInUser: profile,
      isLoggedIn: true,
    });  
  }

/*
  This method updates the state after logout
*/
  afterLogout() {
    this.setState({
      loggedInUser: {},
      isLoggedIn: false,
    });
  }

/*
  This method is the logout link click handler
*/
  logout(e){
    e.preventDefault();
    this.startAuthentication();
    this.state.googleApiLoader.signOut();
  }

/*
  This method marks an authentication start
*/
  startAuthentication() {
    this.setState({ authenticationInProgress: true });
  }

/*
  This method marks an authentication is done
*/
  finishAuthenticationInProgress() {
    this.setState({ authenticationInProgress: false});
  }

/*
  This method is triggered by the search input change to 
  update the keyword state
*/
  updateKeyword(keyword) {
    this.setState({keyword: keyword});
  }

/*
  This method gets the search results using the searcher actions
*/
  getResults() {
    const{ books } = this.state;
    const{ keyword } = this.state;
    return new Searcher(keyword, books).getResults();
  }

/*
  This method updates tags of a specific book
*/
  updateTags(tags, bookId) {
    this.state.books[bookId].tags = tags;
    this.setState({
      books: this.state.books
    })
  }

/*
  This method adds new suggestions to the tags suggestions
*/
  updateTagsSuggestions(suggestions) {
    this.setState({
      tagsSuggestions: suggestions
    })
  }

/*
  Given book attributes object this method saves a new book to the
  books collection
*/
  saveBook(book) {
    var id = new Date().getTime();
    this.state.books['book-' + id] = book;
    this.setState({books: this.state.books})
  }
/*
  This method returns the app components to be rendered after loading
  is finished
*/
  renderApp() {
    if(this.state.isLoggedIn) {
      return this.renderMainPanel();
    }
    else {
      return <Login googleApiLoader={this.state.googleApiLoader}
                    updateLoggedIn={this.updateLoggedIn.bind(this)}
                    loginInProgress={this.state.authenticationInProgress}
                    startAuthentication={this.startAuthentication.bind(this)}/>
    }
  }

/*
  This method returns the main panel components to be rendered in case
  user is authenticated
*/
  renderMainPanel() {
    return (
    <div className='app'>
         <Header user={this.state.loggedInUser} logout={this.logout.bind(this)} />
         <div className='main-panel'>
           <Searchbar updateKeyword={this.updateKeyword.bind(this)}/>
           <BooksPanel saveBook={this.saveBook.bind(this)}
                       updateTags={this.updateTags.bind(this)}
                       perPage={11}
                       books={this.getResults()}
                       suggestions={this.state.tagsSuggestions}
                       addSuggestions={this.updateTagsSuggestions.bind(this)}/>
         </div>
       </div>
    );
  }

/*
  This is the main render method that renders the loading div until
  the auth library finishes loading
*/
  render() {
    if(this.state.finishedLoading){
      return this.renderApp()
    }
    else {
      return <Loading/>
    }
  }
}

