import React from 'react';

import Book from './book.jsx';
import AddBookForm from './addbookform.jsx'

export default class Bookshelf extends React.Component {
  renderBook(key){
    return <Book key={key} details={this.props.books[key]} />
  }
  render() {
    return (
      <ul className='bookshelf'>
        <AddBookForm {...this.props}/>
        {Object.keys(this.props.books).reverse().map(this.renderBook.bind(this))}
      </ul>
    )
  }
}

 