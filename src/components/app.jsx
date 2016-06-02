import React from 'react';

import Helpers from '../helpers/main.js'

import Header from './header.jsx';
import BooksPanel from './bookspanel.jsx';
import Searchbar from './searchbar.jsx';

export default class App extends React.Component {
  
  constructor() {
    super();

    this.state = {
      books: {},
      tags: ['ruby', 'design'],
      keyword:''
    };
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
    const { books } = this.state;

    var book_ids = Object.keys(books);
    var keyword = Helpers.prepareForSearch(this.state.keyword);
    var result_ids = book_ids.filter(
      book_id =>
        Helpers.prepareForSearch(books[book_id].author)
          .includes(keyword) ||
        Helpers.prepareForSearch(books[book_id].title)
          .includes(keyword)  ||
        books[book_id].tags.filter(
          tag => 
            Helpers.prepareForSearch(tag)
              .includes(keyword)
              ).length > 0
      );

    var results = {};
    for (var id of result_ids) {
     results[id] = books[id];
    }
    
    return results;
  }

  render() {
    return (
     <div className='app'>
      <Header/>
       <div className='main-panel'>
        <Searchbar updateKeyword={this.updateKeyword.bind(this)}/>
        <BooksPanel saveBook={this.saveBook.bind(this)} perPage={11} books={this.getResults()}/>
      </div>
     </div>
      )
  }
}
 
