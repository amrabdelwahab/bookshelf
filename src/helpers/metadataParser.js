export default class MetadataParser {

  constructor(info) {
    this.metadata = info.metadata.metadata;
  }

  getBookInfo() {
    return {
      title: this.metadata['dc:title'],
      author: this.metadata['dc:creator'],
      tags: ['ruby', 'design']
    }
  }
}