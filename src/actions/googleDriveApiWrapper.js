export default class GoogleDriveApiWrapper {

  constructor(){
    this.boundary = '-------314159265358979323846';
    this.delimiter = "\r\n--" + this.boundary + "\r\n";
    this.close_delim = "\r\n--" + this.boundary + "--";

    this.app_settings = require('../app_settings.json');
  }

  loadBinaryString(file) {
    
    var contentType = fileData.type || 'application/octet-stream';
    var metadata = {
      'title': fileData.fileName,
      'mimeType': contentType
    };
  }

  prepareMetadata(file) {
    var contentType = file.type || 'application/octet-stream';
    var metadata = {
      'title': file.name,
      'mimeType': contentType
    };

    if(this.app_settings.drive_folder_id)
      metadata['parents'] = [{"id":this.app_settings.drive_folder_id}];
    
    return metadata;
  }
  prepareMultipartRequestBody(file, fileBinary) {

    var metadata = this.prepareMetadata(file);
    var base64Data = btoa(fileBinary);

    var multipartRequestBody =
    this.delimiter +
    'Content-Type: application/json\r\n\r\n' +
    JSON.stringify(metadata) +
    this.delimiter +
    'Content-Type: ' + metadata['mimeType'] + '\r\n' +
    'Content-Transfer-Encoding: base64\r\n' +
    '\r\n' +
    base64Data +
    this.close_delim;
    return multipartRequestBody;

  }

  uploadFile(file, callback, failureCallback) {
    var _this = this;
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e)=> {
      var multipartRequestBody = this.prepareMultipartRequestBody(file, reader.result);
      var request = gapi.client.request({
          'path': '/upload/drive/v2/files',
          'method': 'POST',
          'params': {'uploadType': 'multipart'},
          'headers': {
            'Content-Type': 'multipart/mixed; boundary="' + _this.boundary + '"'
          },
          'body': multipartRequestBody })
        .then((resp)=>callback(resp, file), failureCallback);
          
    }

  }

}