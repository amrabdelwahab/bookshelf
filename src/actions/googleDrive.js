export default class GoogleDriveApiWrapper {

  constructor(){
    this.boundary = '-------314159265358979323846';
    this.delimiter = "\r\n--" + this.boundary + "\r\n";
    this.close_delim = "\r\n--" + this.boundary + "--";

    this.app_settings = require('../app_settings.json');
  }

  loadBinaryString(file) {
    var reader = new FileReader();
    return reader.readAsBinaryString(file);
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
  prepareMultipartRequestBody(file) {
    
    var metadata = this.prepareMetadata(file);
    var fileBinary = this.loadBinaryString(file);
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

  uploadFile(file) {
    
    var multipartRequestBody = this.prepareMultipartRequestBody(file);
    
    var _this = this;
    return new Promise(
      function(resolve, reject) { 
        var request = gapi.client.request({
          'path': '/upload/drive/v2/files',
          'method': 'POST',
          'params': {'uploadType': 'multipart'},
          'headers': {
            'Content-Type': 'multipart/mixed; boundary="' + _this.boundary + '"'
          },
          'body': multipartRequestBody}).then(resp => resolve(resp));
        }
    );
      
  }

}