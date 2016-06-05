export default class Searcher {

  constructor(keyword, books) {
    this.keyword = this.prepareForSearch(keyword);
    this.books = books;
  }
  
  getBooksIds() {
    return Object.keys(this.books);
  }

  getResults() {
    var result_ids = this.filter();
    var results = {};
    for (var id of result_ids) {
      results[id] = this.books[id];
    }
   return results;
  }

  filter() {
    return this.getBooksIds().filter(
      book_id =>
        this.keywordInBook(this.books[book_id])
      )
  }

  keywordInWord(word) {
    return this.prepareForSearch(word).includes(this.keyword);
  }

  keywordInTags(tags) {
    var tagsTexts = tags.map(tag=> tag.text);
    return tagsTexts.filter(tag => this.keywordInWord(tag)).length > 0;
  }

  keywordInBook(book) {
    return(
    this.keywordInWord(book.title)  ||
    this.keywordInWord(book.author) ||
    this.keywordInTags(book.tags)
    );
  }
 
 prepareForSearch(word){
    return word.trim().toLowerCase();
  }
}