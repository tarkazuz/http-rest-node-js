import assert from 'assert/strict'
import InMemoryBookStorage from '../src/lib/in-memory-book-storage.js'

describe('InMemoryBookStorage', () => {
  let storage: InMemoryBookStorage

  beforeEach(() => {
    storage = new InMemoryBookStorage()
  })

  it('should be empty initially', async () => {
    const allBooks = await storage.retrieveAllBooks()

    assert.deepEqual(allBooks, [])
  })

  it('should create a book', async () => {
    const id1 = await storage.saveBook({
      title: 'The Fellowship of the Ring',
      author: 'J.R.R. Tolkien'
    })
    const id2 = await storage.saveBook({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald'
    })
    const allBooks = await storage.retrieveAllBooks()

    assert.deepEqual(allBooks, [
      {
        id: id1,
        title: 'The Fellowship of the Ring',
        author: 'J.R.R. Tolkien'
      },
      {
        id: id2,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald'
      }
    ])
  })

  it('should return single book if existent', async () => {
    assert.equal(await storage.retrieveBookById('1'), undefined)
    await storage.saveBook({
      title: 'The Fellowship of the Ring',
      author: 'J.R.R. Tolkien'
    })

    assert.deepEqual(await storage.retrieveBookById('1'), {
      id: '1',
      title: 'The Fellowship of the Ring',
      author: 'J.R.R. Tolkien'
    })
  })

  it('should delete a book', async () => {
    await storage.saveBook({
      title: 'The Fellowship of the Ring',
      author: 'J.R.R. Tolkien'
    })

    await storage.deleteBook('1')

    assert.equal(await storage.retrieveBookById('1'), undefined)
  })

  it('should throw an error when id does not exist', async () => {
    await assert.rejects(storage.deleteBook('1'))
  })

  it('should delete all books', async () => {
    await storage.saveBook({
      title: 'The Fellowship of the Ring',
      author: 'J.R.R. Tolkien'
    })

    await storage.saveBook({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald'
    })

    await storage.deleteAllBooks()

    assert.deepEqual(await storage.retrieveAllBooks(), [])
  })
})

