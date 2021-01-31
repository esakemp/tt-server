import chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import Sequelize, { Model } from 'sequelize'
import server from '../src/app'
import { Measurement } from '../src/database/models'

const Op = Sequelize.Op

const testMeasurements = [
  { measurement_name: 'Hemoglobiini', unit: 'g/l', lowerbound: 130, upperbound: 146 },
  { measurement_name: 'LDL-kolesteroli', unit: 'mmol/l', lowerbound: 0, upperbound: 4 },
]

chai.use(chaiHttp)
chai.should()
chai.expect

describe('API Routes', function () {
  beforeEach(done => {
    Measurement.destroy({
      where: {},
      truncate: true,
    }).then(() => {
      Measurement.bulkCreate(testMeasurements).then(() => done())
    })
  })
  describe('GET /api/measurements', function () {
    it('should return all measurements', function (done) {
      chai
        .request(server)
        .get('/api/measurements')
        .end(function (err, res) {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('array')
          res.body.length.should.equal(2)
          done()
        })
    })
  })
  describe('POST /api/measurements', function () {
    it('should be able to create measurement', function (done) {
      chai
        .request(server)
        .post('/api/measurements')
        .send({ measurement_name: 'Hemoglobiini-2', unit: 'g/l', lowerbound: 100, upperbound: 200 })
        .end(function (err, res) {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object')
          res.body.should.have.property('measurement_name')
          res.body.should.have.property('unit')
          res.body.should.have.property('lowerbound')
          res.body.should.have.property('upperbound')
          chai
            .request(server)
            .get('/api/measurements')
            .end(function (err, res) {
              res.should.have.status(200)
              res.should.be.json
              res.body.should.be.a('array')
              res.body.length.should.equal(3)
              console.log(res.body)
              done()
            })
        })
    })
  })
  describe('DELETE /api/measurements', function () {
    it('should be able to delete measurement', function (done) {
      chai
        .request(server)
        .get('/api/measurements')
        .end(function (err, res) {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('array')
          res.body.length.should.equal(2)
          const { id } = res.body[0]
          chai
            .request(server)
            .delete(`/api/measurements/${id}`)
            .end(function (error, response) {
              response.should.have.status(200)
              chai
                .request(server)
                .get('/api/measurements')
                .end(function (err, res) {
                  res.should.have.status(200)
                  res.should.be.json
                  res.body.should.be.a('array')
                  res.body.length.should.equal(1)
                  done()
                })
            })
        })
    })
  })
  describe('UPDATE /api/measurements', function () {
    it('should be able to update measurement', function (done) {
      chai
        .request(server)
        .get('/api/measurements')
        .end(function (err, res) {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('array')
          res.body.length.should.equal(2)
          const { id } = res.body[0]
          chai
            .request(server)
            .put(`/api/measurements/${id}`)
            .send({ lowerbound: 666, upperbound: 777 })
            .end(function (error, response) {
              response.should.have.status(200)
              chai
                .request(server)
                .get('/api/measurements')
                .end(function (err, res) {
                  res.should.have.status(200)
                  res.should.be.json
                  res.body.should.be.a('array')
                  res.body.length.should.equal(2)
                  res.body[1].lowerbound.should.equal(666)
                  res.body[1].upperbound.should.equal(777)
                  done()
                })
            })
        })
    })
  })
})
