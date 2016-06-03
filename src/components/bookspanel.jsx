import React from 'react';
import Dropzone from 'react-dropzone';
require('pdfjs-dist/build/pdf.combined');

import MetadataParser from '../helpers/metadataParser.js';
import GoogleDrive from '../helpers/googleDrive.js'

import Bookshelf from './bookshelf.jsx';
import Loading from './loading.jsx';

export default class BooksPanel extends React.Component {
  
  constructor() {
    super();

    this.state = {
      uploadInProgress: false
    };
  }

  onDropRejected() {
    alert('Please make sure you upload one pdf a time');
  }

  onDropAccepted(files) {
      var file = files[0];
      this.setState({uploadInProgress: true});
      this.upload(file).then(this.onFileUploaded.bind(this));
    }

  upload(file){
    var _this = this;
    return new Promise(
      function(resolve, reject) { 
        var googleDrive = new GoogleDrive();
        googleDrive.uploadFile(file)
          .then(resp => resolve({ file, path: resp }))
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
    this.setState({uploadInProgress: false});
  }



  onFileUploaded(response){
    this.setState({file_path: response.path});
    this.readPdf(response.file);
  }

  toggleLoadingGif(){
    if(this.uploadInProgress){
    }
  }

  render() {
    if(this.state.uploadInProgress){ 
      return <Loading/>
    }
    else {
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
}
