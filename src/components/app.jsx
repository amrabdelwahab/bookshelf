import React from 'react';
import Header from './header.jsx';
import Bookshelf from './bookshelf.jsx';


export default class App extends React.Component {
  
  constructor() {
    super();

    this.state = {
      books: {},
      tags: ['ruby', 'design']
    };
    console.log(this.state.tags);
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
       <div className='main-panel'>
        <input className='search' placeholder='Search...'/>
        <span className='ion-search'/>
        <button className='addBook ion-plus'></button>
        <Bookshelf saveBook={this.saveBook.bind(this)} books={this.state.books}/>
      </div>
     </div>
      )
  }
}
 
