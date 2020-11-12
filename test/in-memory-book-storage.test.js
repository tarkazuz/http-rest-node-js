'use strict';

const assert = require('assert');
const InMemoryBookStorage = require('../src/in-memory-book-storage');

describe('InMemoryBookStorage', () => {
  let storage;

  beforeEach(() => {
    storage = new InMemoryBookStorage();
  });

  it('should be empty initially', async () => {
    const allBooks = await storage.retrieveAllBooks();

    assert.deepStrictEqual(allBooks, []);
  });

  it('should create a book', async () => {
    const id1 = await storage.saveBook({
      title: 'The Fellowship of the Ring', 
      author: 'J.R.R. Tolkiens'
    });
    const id2 = await storage.saveBook({
      title: 'The Great Gatsby', 
      author: 'F. Scott Fitzgerald'
    });
    const allBooks = await storage.retrieveAllBooks();

    assert.deepStrictEqual(allBooks, [
      {
        id: id1,
        title: 'The Fellowship of the Ring', 
        author: 'J.R.R. Tolkiens'
      },
      {
        id: id2,
        title: 'The Great Gatsby', 
        author: 'F. Scott Fitzgerald'
      }
    ]);
  });

  it('should return single book if existent', async () => {
    assert.strictEqual(await storage.retrieveBookById('1'), null);
    await storage.saveBook({
      title: 'The Fellowship of the Ring', 
      author: 'J.R.R. Tolkiens'
    });

    assert.deepStrictEqual(await storage.retrieveBookById('1'), {
        id: '1',
        title: 'The Fellowship of the Ring', 
        author: 'J.R.R. Tolkiens'
      });
  });

  describe('delete single', () => {
    it('should delete a book', async () => {
      await storage.saveBook({
        title: 'The Fellowship of the Ring',
        author: 'J.R.R. Tolkiens'
      });
      
      await storage.deleteBook('1');
      
      assert.strictEqual(await storage.retrieveBookById('1'), null);
    });

    it('should throw an error when id does not exist', async () => {
      try {
        await storage.deleteBook('1');
        assert.fail('Expected an error.');
      } catch (e) {
        assert.strictEqual(e.message, 'No entry with id 1 found.');
      }
    });
  });
    
  it('should delete all books', async () => {
    await storage.saveBook({
      title: 'The Fellowship of the Ring', 
      author: 'J.R.R. Tolkiens'
    });

    await storage.saveBook({
      title: 'The Great Gatsby', 
      author: 'F. Scott Fitzgerald'
    });

    await storage.deleteAllBooks();

    assert.deepStrictEqual(await storage.retrieveAllBooks(), []);
  });
});
