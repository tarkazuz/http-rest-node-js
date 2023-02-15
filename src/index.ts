import createApp from './create-app.js'
import BookStorage from './lib/in-memory-book-storage.js'

const { PORT = 3000 } = process.env

const storage = new BookStorage()
const app = createApp(storage)

app
  .on('error', (err: Error) => console.error(err.stack))
  .listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
  })
