const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')

describe('GET /', () => {
  it('should return a welcome message', async () => {
    const res = await request(app).get('/')
    expect(res.status).to.equal(200)
    expect(res.body.message).to.include('Code Bean Café')
  })
})

describe('GET /menu', () => {
  it('should return an array of menu items', async () => {
    const res = await request(app).get('/menu')
    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
  })

  it('should return 5 items', async () => {
    const res = await request(app).get('/menu')
    expect(res.body).to.have.lengthOf(5)
  })

  it('each item should have id, name, and price', async () => {
    const res = await request(app).get('/menu')
    res.body.forEach(item => {
      expect(item).to.have.property('id')
      expect(item).to.have.property('name')
      expect(item).to.have.property('price')
    })
  })
})

describe('GET /menu/:id', () => {
  it('should return a single item by id', async () => {
    const res = await request(app).get('/menu/1')
    expect(res.status).to.equal(200)
    expect(res.body.name).to.equal('Espresso')
  })

  it('should return 404 for an id that does not exist', async () => {
    const res = await request(app).get('/menu/999')
    expect(res.status).to.equal(404)
    expect(res.body).to.have.property('error')
  })
})
