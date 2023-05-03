import express, { ErrorRequestHandler } from 'express'
import InMemoryBookStorage from './in-memory-book-storage.js'
import InvalidParam from './invalidParamError.js'
// import { Book } from './in-memory-book-storage.js'

export default function createApp (storage: InMemoryBookStorage) {
    const app = express()

    // const GET_ALL = () => {
    //     type Params = unknown
    //     type ResBody = Book[]
    //     app.get<Params, ResBody>('/api/v1/books', async ( res: ResBody ) => {
    //         res.send([])
    //     })
    // }
    app.get('/api/v1/books', async (req, res) => {
        const getAllBooks = await storage.retrieveAllBooks()
        if(!Object.keys(getAllBooks).length){
            res.send([])
        }else{
            res.send(getAllBooks)}

    })

    app.get('/api/v1/books/:id', async (req, res, next) => {

    try{
        const bookID = req.params.id
        const book = await storage.retrieveBookById(bookID)

        if(book){
            res.send(book).status(200)
        }else{
            res.sendStatus(404)
        }
    } catch(error){
        next(error)
    }

    })

    app.post('/api/v1/books', express.json(), async (req, res, next ) => {
        const payload = req.body
        const newBookID = await storage.saveBook(payload)
        payload.id = newBookID
        res.set('Location', `/api/v1/books/${newBookID}`)
            .status(201)
            .json(payload)

    })
    const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
        if (error instanceof InvalidParam) {
          res
            .status(400)
            .set('Content-Type', 'text/plain')
            .send(error.message)
        } else {
          next(error)
        }
      }

      app.use(errorHandler)

    return app
}
