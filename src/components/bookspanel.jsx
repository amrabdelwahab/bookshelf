import React from 'react';
import Dropzone from 'react-dropzone';
require('pdfjs-dist/build/pdf.combined');

import MetadataParser from '../helpers/metadataParser.js';

import Bookshelf from './bookshelf.jsx';

export default class BooksPanel extends React.Component {
  
  onDropRejected() {
    alert('Please make sure you upload one pdf a time');
  }

  onDropAccepted(files) {
      var file = files[0];
      this.upload(file).then(this.onFileUploaded.bind(this));
    }

  upload(file){
    return new Promise(
      function(resolve, reject) { 
        
        //Here the upload to Gdrive happens and resolves in case of success

        resolve({ file, path: 'test' });
      }
    );
  }

  readPdf(file) {
    const reader = new FileReader();
    reader.onloadend = () =>
      this.loadDocument(new Uint8Array(reader.result));
    reader.readAsArrayBuffer(file);
  }

  loadDocument(byteArray) {
    window.PDFJS.getDocument(byteArray)
      .then(this.onDocumentLoad.bind(this));
  }

  onDocumentLoad(pdf) {
    pdf.getMetadata().then(this.onMetaDataExtracted.bind(this));
  }

  onMetaDataExtracted(metadata) {
    var bookInfo = new MetadataParser(metadata).getBookInfo();

    bookInfo['file_path'] = this.state.file_path;
    this.props.saveBook(bookInfo);
  }



  onFileUploaded(response){
    this.setState({file_path: response.path});
    this.readPdf(response.file);
  }

  

  render() {
    return (
      <Dropzone accept={'application/pdf'}
                className='dropDiv'
                activeClassName='dropActive'
                rejectClassName='dropReject' 
                disableClick={true} 
                multiple={false} 
                onDropAccepted={this.onDropAccepted.bind(this)}
                onDropRejected={this.onDropRejected}>
        <Bookshelf {...this.props} />
      </Dropzone>
    );
  }
}
