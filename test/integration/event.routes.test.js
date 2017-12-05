/* eslint-disable */

const promise = require('bluebird');
const request = require('supertest');
const should = require('should');
const sinon = require('sinon');

const app = require('../../server');
const port = process.env.PORT || 3030;
const env = process.env.NODE_ENV || 'test';

app.listen(port, () => {
  console.log(`Forloop-API-${env} running on port: ${port}`);
});

const Models = require('../../models');

let token;
describe('Event routes', function() {
  before(function(done) {
    stubSetup();
    dbSetup(done);
  });

  after(function(done) {
    stubTeardown();
    dbTeardown(done);
  });

  describe('Event', function() {
    it('should create a new event', function(done) {
      const data = {
        active: 1
      };
      request(app)
        .post('/api/events')
        .send(data)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect(res => {
          should(res.body.data).have.property('id', data.identifier);
        })
        .end(function(err, res) {
          if (err) return done(err);
          if (res) {
            return done();
          }
        });
    });
  });

});

const dbSetup = done => {
  // generate token for authentication
  done();
};

const stubSetup = () => {
  // set up methods stubs
};

const dbTeardown = done => {
  // Destroy models hahaha
  const event = Models.Event.destroy({force: true, where: {}});
  promise.all([event])
  .then(results => {
    done();
  }).catch(err => {
    done(err);
  })
};

const stubTeardown = () => {
  // restore stubbed methods
};
