'use strict';

function InMemoryBookStorage () {
  const books = {
    ids: [],
    entries: {}
  };

  this.retrieveAllBooks = () => new Promise(resolve => {
    resolve(books.ids.map(id => books.entries[id]));
  });

  this.retrieveBookById = (id) => new Promise(resolve => {
    if (id && books.ids.includes(id)) {
      return resolve(books.entries[id]);
    }
    resolve(null);
  });

  this.saveBook = (book) => new Promise(resolve => {
    const id = (books.ids.length + 1).toString();
    books.ids.push(id);
    books.entries[id] = {
      id: id,
      ...book
    };
    resolve(id);
  });

  this.deleteBook = (id) => new Promise((resolve, reject) => {
    const index = books.ids.indexOf(id);
    if (index < 0) {
      return reject(new Error(`No entry with id ${id} found.`));
    }
    books.ids.splice(index, 1);
    delete books.entries[id];
    resolve();
  });

  this.deleteAllBooks = () => new Promise(resolve => {
    books.ids = [];
    books.entries = {};
    resolve();
  });
};

module.exports = InMemoryBookStorage;
