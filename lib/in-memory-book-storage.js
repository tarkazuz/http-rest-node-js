export default class InMemoryBookStorage {
  #books = null

  constructor() {
    this.#books = new Map()
  }

  async retrieveAllBooks() {
    return [
      ...this.#books.values()
    ]
  }

  async retrieveBookById(id) {
    return this.#books.get(id) ?? null
  }

  async saveBook(book) {
    const id = `${this.#books.size + 1}`
    this.#books.set(id, {...book, id})
    return id
  }

  async deleteBook(id) {
    if (!this.#books.has(id)) {
      throw new Error(`No entry with id ${id} found.`)
    }
    this.#books.delete(id)
  }

  async deleteAllBooks() {
    this.#books.clear()
  }
}
