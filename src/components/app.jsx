import React from 'react';
import Header from './header.jsx';
import Toolbar from './toolbar.jsx';
import Bookshelf from './bookshelf.jsx';


export default class App extends React.Component {
  
  constructor() {
    super();

    this.state = {
      books: {},
      tags: {}
    };
  }

  saveBook(book) {
    var id = new Date().getTime();
    this.state.books['book-' + id] = book;
    this.setState({books: this.state.books})
  }

  render() {
    return (
     <div className='app'>
      <Header/>
      <Toolbar saveBook={this.saveBook.bind(this)} />
      <div className='main-panel'>
        <div className='searchbar'>search</div>
        <Bookshelf/>
      </div>
     </div>
      )
  }
}
 
