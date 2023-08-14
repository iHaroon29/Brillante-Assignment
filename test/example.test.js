import chai from 'chai'
import chaiHttp from 'chai-http'

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

describe('Test Gold API', () => {
  describe('GET /generatePrice', () => {
    it('should return a randomly generated price for Gold', (done) => {
      chai
        .request('http://localhost:5500/api/v1')
        .get(`/generatePrice?token:${credentials.secret}`)
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
  describe('GET /item/:id', () => {
    it('should return current price and best price for product with id', (done) => {
      chai
        .request('http://localhost:5500/api/v1')
        .get(`/item/64d9c93793efe91d81fd277b`)
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status()
          } else {
          }
          done()
        })
    })
  })
})
