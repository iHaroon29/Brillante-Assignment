import chai from 'chai'
import chaiHttp from 'chai-http'
import { credentials } from '../config/credential.js'

chai.use(chaiHttp)
const expect = chai.expect

describe('Test API', () => {
  describe('GET /health', () => {
    it('should return status of the API', (done) => {
      chai
        .request('http://localhost:5500')
        .get('/health')
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500)
            expect(res.body)
              .to.have.property('message')
              .that.is.equal('Internal Server Error')
          } else {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('message').equal('Healthy :)')
          }
          done()
        })
    })
  })
})

describe('Test Gold Tracker API', () => {
  describe('GET /goldPrice?token=${credentials.secretToken}&generate=${true}', () => {
    it('should return a randomly generated price for Gold', (done) => {
      chai
        .request('http://localhost:5500/api/v1')
        .get(`/goldPrice?token=${credentials.secretToken}&generate=${true}`)
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(400)
            expect(res.body)
              .to.have.property('message')
              .that.is.equal('Missing Secret Token!')
          } else {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('status').equal('OK')
          }
          done()
        })
    })
  })
  describe('GET /goldPrice?token=${credentials.secretToken}&current=${true}', () => {
    it('should return current price of gold', (done) => {
      chai
        .request('http://localhost:5500/api/v1')
        .get(`/goldPrice?token=${credentials.secretToken}&current=${true}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('price').that.is.a('number')
          done()
        })
    })
  })
  describe('GET /goldPrice?token=${credentials.secretToken}&time_range_max=${30}', () => {
    it('should return min gold price between time ranges', (done) => {
      chai
        .request('http://localhost:5500/api/v1')
        .get(`/goldPrice?token=${credentials.secretToken}&time_range_max=30`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('minPrice').that.is.a('number')
          expect(res.body).to.have.property('date').that.is.a('string')
          const dateValue = new Date(res.body.date)
          expect(dateValue.toString()).to.not.equal('Invalid Date')
          done()
        })
    })
  })
})

describe('Test Price Fetch and Update Routes', () => {
  describe('GET /item?', () => {
    it('should return current and best price for all item', (done) => {
      chai
        .request('http://localhost:5500/api/v1')
        .get('/item?')
        .end((err, res) => {
          if (err) {
            console.log(err.body)
          } else {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('items').that.is.an('array')
            const { items } = res.body
            expect(items[0]).to.have.property('itemName').that.is.a('string')
            expect(items[0]).to.have.property('itemWeight').that.is.a('number')
            expect(items[0]).to.have.property('itemPrice').that.is.a('number')
            expect(items[0]).to.have.property('bestPrice').that.is.a('number')
            expect(items[0])
              .to.have.property('bestPriceDate')
              .that.is.a('string')
            const testDate = new Date(items[0].bestPriceDate)
            expect(testDate.toString()).to.not.equal('Invalid Date')
          }
          done()
        })
    })
  })
  describe('GET /item?id=64d9c8c07178013d59c5b8bf', () => {
    it('should return current and best price for one item', (done) => {
      chai
        .request('http://localhost:5500/api/v1')
        .get('/item?id=64d9c8c07178013d59c5b8bf')
        .end((err, res) => {
          if (err) {
            console.log(err.body)
          } else {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('items').that.is.an('array')
            const { items } = res.body
            expect(items[0]).to.have.property('itemName').that.is.a('string')
            expect(items[0]).to.have.property('itemWeight').that.is.a('number')
            expect(items[0]).to.have.property('itemPrice').that.is.a('number')
            expect(items[0]).to.have.property('bestPrice').that.is.a('number')
            expect(items[0])
              .to.have.property('bestPriceDate')
              .that.is.a('string')
            const testDate = new Date(items[0].bestPriceDate)
            expect(testDate.toString()).to.not.equal('Invalid Date')
          }
          done()
        })
    })
  })
  describe('GET /item?time_range_max=15', () => {
    it('should return current and best price for all items within today to max range', (done) => {
      chai
        .request('http://localhost:5500/api/v1')
        .get('/item?time_range_max=15')
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(400)
            expect(res.body)
              .to.have.property('message')
              .that.is.equal('time_range_min must be >= 0')
          } else {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('items').that.is.an('array')
            const { items } = res.body
            expect(items[0]).to.have.property('itemName').that.is.a('string')
            expect(items[0]).to.have.property('itemWeight').that.is.a('number')
            expect(items[0]).to.have.property('itemPrice').that.is.a('number')
            expect(items[0]).to.have.property('bestPrice').that.is.a('number')
            expect(items[0])
              .to.have.property('bestPriceDate')
              .that.is.a('string')
            const testDate = new Date(items[0].bestPriceDate)
            expect(testDate.toString()).to.not.equal('Invalid Date')
          }
          done()
        })
    })
  })
  describe('GET /item?id=64d9c8c07178013d59c5b8bf&time_range_max=15', () => {
    it('should return current and best price for one item within today to max range', (done) => {
      chai
        .request('http://localhost:5500/api/v1')
        .get('/item?id=64d9c8c07178013d59c5b8bf&time_range_max=15')
        .end((err, res) => {
          if (err) {
            console.log(err)
          } else {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('items').that.is.an('array')
            const { items } = res.body
            expect(items[0]).to.have.property('itemName').that.is.a('string')
            expect(items[0]).to.have.property('itemWeight').that.is.a('number')
            expect(items[0]).to.have.property('itemPrice').that.is.a('number')
            expect(items[0]).to.have.property('bestPrice').that.is.a('number')
            expect(items[0])
              .to.have.property('bestPriceDate')
              .that.is.a('string')
            const testDate = new Date(items[0].bestPriceDate)
            expect(testDate.toString()).to.not.equal('Invalid Date')
          }
          done()
        })
    })
  })
  describe('GET /item?id=64d9c8c07178013d59c5b8bf&time_range_max=-1', () => {
    it('should return error indicating invalid time_range_max', (done) => {
      chai
        .request('http://localhost:5500/api/v1')
        .get('/item?id=64d9c8c07178013d59c5b8bf&time_range_max=-1')
        .end((err, res) => {
          expect(res).to.be.status(400)
          expect(res.body).to.have.property('message').that.is.a('string')
          expect(res.body.message).to.be.equal('time_range_max must be >= 1')
          done()
        })
    })
  })
  describe('GET /item?id=64d9c8c07178013d59c5b8bf&time_range_min=0&time_range_max=40', () => {
    it('should return error indicating invalid time_range_max', (done) => {
      chai
        .request('http://localhost:5500/api/v1')
        .get('/item?id=64d9c8c07178013d59c5b8bf&time_range_max=40')
        .end((err, res) => {
          expect(res).to.be.status(400)
          expect(res.body).to.have.property('message').that.is.a('string')
          expect(res.body.message).to.be.equal('time_range_max must be <= 30')
          done()
        })
    })
  })
  describe('GET /item?id=64d9c8c07178013d59c5b8bf&time_range_min=0&time_range_max=40', () => {
    it('should return error indicating invalid id string', (done) => {
      chai
        .request('http://localhost:5500/api/v1')
        .get('/item?id=64d9c8c07178013d59c5b8&time_range_max=30')
        .end((err, res) => {
          expect(res).to.be.status(400)
          expect(res.body).to.have.property('message').that.is.a('string')
          expect(res.body.message).to.be.equal(
            'id must match pattern "^[A-Fa-f0-9]{24}$"'
          )
          done()
        })
    })
  })
  describe('PATCH /item?', () => {
    it('should update the prices of all items', (done) => {
      chai
        .request('http://localhost:5500/api/v1')
        .patch('/item')
        .end((err, res) => {
          expect(res).to.be.status(200)
          expect(res.body).to.have.property('status').that.is.a('string')
          expect(res.body.status).to.be.equal('OK')
          done()
        })
    })
  })
})
