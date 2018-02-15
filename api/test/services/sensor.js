let mongoose = require('mongoose');
let Sensor = require('../../models/sensor');

// require devDependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');

chai.use(chaiHttp);

describe('Sensor', () => {

  describe('/GET sensors', () => {
    it('it should get all sensors', (done) => {
      chai.request(server)
        .get('/api/sensors')
        .end((err, res) => {
          // res.should.have.status(200);
          res.body.should.be.a('array');
          done()
        });
    });
  })
})
