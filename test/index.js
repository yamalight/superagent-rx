// assert lib
var should = require('should');

// prepare superagent with rx plugin
var superagent = require('superagent');
var superagentRx = require('../index');
superagentRx(superagent);

// mock responses
var nock = require('nock');
var requestUrl = 'http://example.org';
nock(requestUrl)
    .post('/')
    .times(2)
    .reply(200, {
        test: 'OK',
    })
    .get('/error')
    .once()
    .reply(404);

describe('Superagent-Rx', function() {
    const reqBody = {test: 1};

    it('should execute normal request', function(done) {
        superagent
            .post(requestUrl)
            .type('form')
            .send(reqBody)
            .end(function(err, res) {
                should(res.body.test).equal('OK');
                done();
            });
    });

    it('should return Rx.Observable', function(done) {
        superagent
            .post(requestUrl)
            .type('form')
            .send(reqBody)
            .observe()
            .subscribe(function(res) {
                should(res.body.test).equal('OK');
                done();
            });
    });

    it('should return Rx.Observable with error', function(done) {
        superagent
            .get(requestUrl + '/error')
            .observe()
            .subscribe(function() {},
            function(err) {
                should(err.status).equal(404);
                done();
            });
    });
});
