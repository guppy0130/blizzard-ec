/* eslint-env mocha */
let supertest = require('supertest');
const assert = require('assert');
supertest = supertest('http://localhost:3000');
let server;

before(function() {
    server = require('./server'); // start the server
});

describe('GET /', function() {
    it('should return time within 5s', function() {
        const time = new Date();
        return supertest
            .get('/')
            .expect(200) // expect it to hit
            .expect('Content-Type', /json/) // expect JSON response
            .then(response => {
                const serverDate = new Date(response.body.date);
                assert.ok(serverDate - time < 1000 * 5); // server returned date close enough to target (delta 5s)
            });
    });

    it('should have a version', function() {
        return supertest
            .get('/')
            .expect(200)
            .then(response => {
                assert.ok(response.body.version.match(/v\d/)); // version should not be empty
            });
    });
});

describe('GET /nonexistent', function() {
    it('404s everything else', function() {
        return supertest
            .get('/nonexistent')
            .expect(404); // expect it to not hit and 404
    });
});

after(function() {
    server.close(); // close the server and let the process end
});
