import React from 'react';
import ReactPaginate from 'react-paginate';

import Book from './book.jsx';
import AddBookHint from './addbookhint.jsx';

export default class Bookshelf extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      page: 0
    }
  }

  loadBooks(books) {
    const { offset } = this.state;
    var books_ids = Object.keys(books).reverse();
    var results = {};
    for(var i= offset; (i < books_ids.length) && (i < (offset+this.props.perPage)); i++)
      results[books_ids[i]] = books[books_ids[i]];

    return(results);
  }

  
  componentDidMount() {
    var books_ids = Object.keys(this.props.books);
    this.setState({
      pageNum: Math.ceil(books_ids.length / this.props.perPage),
      data: this.loadBooks(this.props.books)
    });
  }

  componentWillReceiveProps(nextProps) {
    var books_ids = Object.keys(nextProps.books);
    let selected = 0;
    let offset = Math.ceil(selected * this.props.perPage);
    this.setState({ 
      page: 0,
      offset:0, 
      pageNum: Math.ceil(books_ids.length / this.props.perPage),
      data: this.loadBooks(nextProps.books) 
    });
  }

  handlePageClick(event) {
    let selected = event.selected;
    let offset = Math.ceil(selected * this.props.perPage);
    this.setState({
      offset: offset,
      page: selected
    });
    this.setState({
      data: this.loadBooks(this.props.books)
    });
  };


  renderBook(key){
    return <Book key={key} details={this.props.books[key]} />
  }

  render() {
    return (
      <span className='bookshelf'>
        <AddBookHint/>   
        <ul>
          {
            Object.
              keys(this.loadBooks(this.props.books)).
              map(this.renderBook.bind(this))
            }
        </ul>
        <ReactPaginate previousLabel={"<"}
                         nextLabel={">"}
                         breakLabel={<a href="">...</a>}
                         pageNum={this.state.pageNum}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         clickCallback={this.handlePageClick.bind(this)}
                         containerClassName={"pagination"}
                         subContainerClassName={"pages pagination"}
                         activeClassName={"active"}
                         initialSelected={0}
                         forceSelected={this.state.page} />
                         
      
      </span>
    )
  }
}

 
