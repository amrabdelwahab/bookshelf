import React from 'react';
import Helpers from '../helpers/main.js'
export default class AddBookForm extends React.Component {

  createBook(event) {
    event.preventDefault();
    console.log(Helpers.upload_file);
    var book = {
      title: this.refs.title.value,
      author: this.refs.author.value,
      year: this.refs.year.value,
      isbn: this.refs.isbn.value,
      file_path: Helpers.upload_file(),
      tags: {}
    }
    this.props.saveBook(book);
    
  }

  render() {
    return (
      <form onSubmit={this.createBook.bind(this)} className='add-book-form'>
        <input type='text' required ref='title' className='title' placeholder='Book title'/>
        <input type='text' ref='author' className='author' placeholder='Book Author'/>
        <input type='text' ref='year' className='year' placeholder='Year of Publish'/>
        <input type='text' ref='isbn' className='year' placeholder='ISBN'/>
        <input type='file' ref='book-file' className='book-uploader' />
        
        <input type='submit' className='submit' value='Add book'/>
      </form>
    );
  }
}
