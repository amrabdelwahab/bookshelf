import React from 'react';
import Dropzone from 'react-dropzone';
require('pdfjs-dist/build/pdf.combined');

import MetadataParser from '../actions/metadataParser.js';
import GoogleDriveApiWrapper from '../actions/googleDriveApiWrapper.js'

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
      this.upload(file)
    }

  upload(file){
    var _this = this;
    var googleDrive = new GoogleDriveApiWrapper();
    googleDrive
      .uploadFile(
        file,
       _this.fileUploadDone.bind(_this),
      _this.onFileUploadFailed.bind(_this)
      );
  }

  fileUploadDone(resp, file) {
    if(resp.status == 200){
      this.onFileUploaded({ file, download_link: resp.result.webContentLink });
    }
    else {
      this.onFileUploadFailed(resp);
    }
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

    bookInfo['download_link'] = this.state.current_upload_download_link;
    this.props.saveBook(bookInfo);
    this.setState({
      uploadInProgress: false,
      current_upload_download_link: ''
    });
  }

  onFileUploadFailed(response){
    this.setState({uploadInProgress: false});
    alert("Upload to google drive failed:\n" + response.result.error.message);
  }

  onFileUploaded(response){
    this.setState({current_upload_download_link: response.download_link});
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
