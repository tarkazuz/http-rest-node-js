'use strict';

const assert = require('assert');
const InMemoryBookStorage = require('../src/in-memory-book-storage');

describe('InMemoryBookStorage', () => {
  let storage;

  beforeEach(() => {
    storage = new InMemoryBookStorage();
  });

  it('retrieveAllBooks: returns empty array initially', () => {
    assert.deepEqual(storage.retrieveAllBooks(), []);
  });

  it('saveBook: creates a book', () => {
    storage.saveBook({
      title: 'The Fellowship of the Ring', 
      author: 'J.R.R. Tolkiens'
    });

    storage.saveBook({
      title: 'The Great Gatsby', 
      author: 'F. Scott Fitzgerald'
    });

    assert.deepEqual(storage.retrieveAllBooks(), [
      {
        id: 1,
        title: 'The Fellowship of the Ring', 
        author: 'J.R.R. Tolkiens'
      },
      {
        id: 2,
        title: 'The Great Gatsby', 
        author: 'F. Scott Fitzgerald'
      }
    ]);
  });

  it('retrieveBookById: returns book if existent', () => {
    assert.equal(storage.retrieveBookById(1), null);
    storage.saveBook({
      title: 'The Fellowship of the Ring', 
      author: 'J.R.R. Tolkiens'
    });

    assert.deepEqual(storage.retrieveBookById(1), {
        id: 1,
        title: 'The Fellowship of the Ring', 
        author: 'J.R.R. Tolkiens'
      });
  });

  it('deleteBook: deletes a book', () => {
    storage.saveBook({
      title: 'The Fellowship of the Ring', 
      author: 'J.R.R. Tolkiens'
    });

    storage.deleteBook(1);

    assert.equal(storage.retrieveBookById(1), null);
  });

  it('deleteAllBooks: deletes all books', () => {
    storage.saveBook({
      title: 'The Fellowship of the Ring', 
      author: 'J.R.R. Tolkiens'
    });

    storage.saveBook({
      title: 'The Great Gatsby', 
      author: 'F. Scott Fitzgerald'
    });

    storage.deleteAllBooks();

    assert.deepEqual(storage.retrieveAllBooks(), []);
  });
});
