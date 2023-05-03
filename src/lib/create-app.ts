import express from 'express'
import InMemoryBookStorage from './in-memory-book-storage.js'
// import { RequestHandler } from 'express'
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
        res.send([])
    })


    // type Params = {id: string}
    app.get('/api/v1/books/:id', async (req, res) => {
        const bookID = req.params.id
        const book = await storage.retrieveBookById(bookID)

        if(book){
            res.send(book).status(200)
        }else{
            res.sendStatus(404)
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
    return app
}
