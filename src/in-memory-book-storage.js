'use strict';

function InMemoryBookStorage () {
  const books = {
    ids: [],
    entries: {}
  };

  this.retrieveAllBooks = () => {
    return books.ids.map(id => books.entries[id]);
  };

  this.retrieveBookById = (id) => {
    if (id && books.ids.includes(id)) {
      return books.entries[id];
    }
    return null;
  };

  this.saveBook = (book) => {
    const id = books.ids.length + 1;
    books.ids.push(id);
    books.entries[id] = {
      id: id,
      ...book
    };
  };

  this.deleteBook = (id) => {
    const idx = books.ids.indexOf(id);
    if (idx > -1) {
      books.ids.splice(idx, 1);
      delete books.entries[id];
    }
  };

  this.deleteAllBooks = () => {
    books.ids = [];
    books.entries = {};
  };
};

module.exports = InMemoryBookStorage;
