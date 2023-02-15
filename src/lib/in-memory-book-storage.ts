export type BookPayload = {
  title: string
  author: string
}

export type Book = BookPayload & {
  id: string
}

export default class InMemoryBookStorage {

  constructor(private books: Map<string, Book> = new Map()) { }

  async retrieveAllBooks() {
    return [
      ...this.books.values()
    ]
  }

  async retrieveBookById(id: string) {
    return this.books.get(id)
  }

  async saveBook(book: BookPayload): Promise<string> {
    const id = `${this.books.size + 1}`
    this.books.set(id, { ...book, id })
    return id
  }

  async deleteBook(id: string) {
    if (!this.books.has(id)) {
      throw new Error(`No entry with id ${id} found.`)
    }
    this.books.delete(id)
  }

  async deleteAllBooks() {
    this.books.clear()
  }
}
