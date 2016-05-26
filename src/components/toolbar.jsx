import React from 'react';
import ReactDOM from 'react-dom';

import AddBookForm from './addbookform.jsx'

export default class Toolbar extends React.Component {

  renderAddBook(){
    ReactDOM.render(<AddBookForm {...this.props}/>, document.querySelector('.forms-panel'));
  }

  render() {
    return (
      <div className='toolbar'>
        <button onClick={this.renderAddBook.bind(this)}>+</button>
        <div className='forms-panel'></div>
      </div>
    );
  }
}
