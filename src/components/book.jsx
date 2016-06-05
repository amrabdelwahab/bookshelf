import React from 'react';
import InlineEdit from 'react-edit-inline';

var ReactTags = require('react-tag-input').WithContext;

export default class Book extends React.Component {

  constructor() {
    super();
    this.state = {
      tagsEditInProgress: false 
    }
  }

  componentDidUpdate() {
    if(this.state.tagsEditInProgress) {
      var element = document.querySelector('.tagInputClass');
      var  textInput = element.querySelector('input[type=text]');
      textInput.addEventListener('blur', this.finishEditTags.bind(this));
    }
  }

  renderTag(tag) {
    return <div key={tag} className='tag-detail'> {tag} </div>
  }

  handleDelete(i) {
    var tags = this.props.details.tags;
    tags.splice(i, 1);
    this.props.updateTags(tags, this.props.bookId);
  }

  handleAddition(tag) {
    var tags = this.props.details.tags;
    var suggestions = this.props.suggestions;
    if(!suggestions.includes(tag)) {
      suggestions.push(tag);
      this.props.addSuggestions(suggestions)
    }
    tags.push({
      id: tags.length + 1,
      text: tag
    });

    this.props.updateTags(tags, this.props.bookId);
  }


  renderTags() {
    if(this.state.tagsEditInProgress){
      return (
          <ReactTags tags={this.props.details.tags}
                  suggestions={this.props.suggestions}
                  handleDelete={this.handleDelete.bind(this)}
                  handleAddition={this.handleAddition.bind(this)}
                  autocomplete={true}
                  classNames={{
                    tags: 'tags',
                    tagInput: 'tagInputClass',
                    selected: 'selectedClass',
                    tag: 'tag-detail',
                    remove: 'removeClass',
                    suggestions: 'suggestionsClass'
                    }}/>
        )
    }
    else {
      return (
        <div className='tags'>
          {this.props.details.tags.map(tag => this.renderTag(tag.text))}
          <button onClick={this.startEditTags.bind(this)} className='ion-pricetags edit-tags'></button>
        </div>
        )
    }
    
  }

  finishEditTags() {
    this.setState({tagsEditInProgress: false});
  }

  startEditTags() {
    this.setState({tagsEditInProgress: true});
  }

  titleChanged(data) {
    this.props.updateTitle(data['title'], this.props.bookId);
  }

  authorChanged(data) {
    this.props.updateAuthor(data['author'], this.props.bookId);
  }

  render() {
    return (
      <li className='book'>
        <h3 className='book-title'>
        <InlineEdit
              text={this.props.details.title}
              paramName="title"
              change={this.titleChanged.bind(this)}
            />
          <div className='actions'>
            <a href={this.props.details.download_link} className='download'><span className='ion-android-download'/></a>
          </div>
        </h3>
        <div className='details'>
          <div className='author'>
          <InlineEdit
              text={this.props.details.author}
              paramName="author"
              change={this.authorChanged.bind(this)}
            />
          </div>
          {this.renderTags()}
        </div>
      </li>
    );
  }
}
