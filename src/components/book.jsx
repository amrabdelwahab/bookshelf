import React from 'react';

export default class Book extends React.Component {
  renderTag(tag){
    return <div className='tag-detail'> {tag} </div>
  }

  render() {
    return (
      <li className='book'>
        <h3 className='book-title'>{this.props.details.title}</h3>
        <div className='details'>
          <div className='author'>{this.props.details.author}</div>
          {this.props.details.tags.map(tag => this.renderTag(tag))}
        </div>
      </li>
    );
  }
}