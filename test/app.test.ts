import supertest from 'supertest'
import assert from 'assert/strict'
import createApp from '../src/lib/create-app.js'
import { BookPayload } from '../src/lib/in-memory-book-storage.js'
import InMemoryBookStorage from '../src/lib/in-memory-book-storage.js'

describe('App', () => {
    const bookPlayload: BookPayload = {
        title: 'testtitle',
        author: 'the best author'
    }

    let client: any

    beforeEach(() => {
        const storage = new InMemoryBookStorage()
        client = supertest(createApp(storage))
    })

    it('should return an empty list for all books initially', async () => {
        const response = await client.get('/api/v1/books')
            .expect(200).expect('Content-Type', /application\/json/u)

        assert.deepEqual(response.body, [])
    })

    it('should create a book', async () => {
        const response = await client.post('/api/v1/books').send(bookPlayload).expect('Content-Type', /application\/json/u)
        const requestID = response.body.id
        assert.deepEqual(response.body, {
            id: requestID,
            title: 'testtitle',
            author: 'the best author'
        })
        assert.ok(response.body.id)
        assert.equal(`/api/v1/books/${requestID}`, response.header.location)
        // assert.equal(response.header['content-type'].includes('application/json'), true)
    })

    it('should return 404 for a non-existing book', async () => {
        await client.get('/api/v1/books/1')
            .expect(404)
    })

    it('should get a single book', async () => {
        const postResponse = await client.post('/api/v1/books').send(bookPlayload)
        assert.deepEqual(postResponse.status, 201)
        const resourceLocation = postResponse.header.location
        const getResponse = await client.get(resourceLocation).expect(200).expect('Content-Type', /application\/json/u)
        assert.deepEqual(postResponse.body, getResponse.body)
    })
})
