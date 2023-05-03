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
    let client: supertest.SuperTest<supertest.Test>
    let storage: InMemoryBookStorage
    before(() => {
        storage = new InMemoryBookStorage()
        client = supertest(createApp(storage))
    })
    beforeEach(async () => {
        await storage.deleteAllBooks()
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

    it('should get all stored books', async () => {
        const postResponse = await client.post('/api/v1/books').send(bookPlayload)
        assert.deepEqual(postResponse.status, 201)
        const getAllResponse = await client.get('/api/v1/books').expect(200)
        assert.deepEqual(getAllResponse.body.length, 1)
        assert.deepEqual(getAllResponse.body, [postResponse.body])
        const nextPayload = {title: 'new title', author: 'another author'}
        const postResponseNext = await client.post('/api/v1/books').send(nextPayload)
        assert.deepEqual(postResponseNext.status, 201)
        const getAllResponseNext = await client.get('/api/v1/books').expect(200)
        assert.deepEqual(getAllResponseNext.body.length, 2)
        assert.deepEqual(getAllResponseNext.body, [postResponse.body, postResponseNext.body])

    })
    it('should return 400 on get single request with invalid id', async ()=>{
        await client.get('/api/v1/books/-1')
        .expect(400)
    })
})
