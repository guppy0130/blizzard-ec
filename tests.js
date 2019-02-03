/* eslint-env mocha */
let supertest = require('supertest');
const assert = require('assert');
supertest = supertest('http://localhost:3000');
require('./server');

describe('GET /', function() {
    it('should return info', function () {
        const time = new Date();
        return supertest
            .get('/')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {
                console.log(response.body.date - time);
                assert.ok(response.body['date'] - time < new Date(0, 0, 0, 0, 1));
            });
    });
});

describe('GET /nonexistent', function() {
    it('404s everything else', function() {
        return supertest
            .get('/nonexistent')
            .expect(404);
    });
});
