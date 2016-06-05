export default class MetadataParser {

  constructor(info) {
    this.metadata = info.metadata.metadata;
  }

  getBookInfo() {
    return {
      title:  (typeof(this.metadata['dc:title']) === 'undefined') ?
         'Edit to add title' : this.metadata['dc:title'],
      author: (typeof(this.metadata['dc:creator']) === 'undefined') ?
         'Edit to add author': this.metadata['dc:creator'],
      tags: []
    }
  }
}