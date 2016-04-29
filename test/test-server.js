var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = 'test';
var server = require('../server.js');
var Item = require('../models/item');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        seed.run(function() {
            done();
        });
    });

    it('should list items on GET', function (done) {
        chai.request(app)
            .get('/items')
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });

    // it('should add an item on POST', function(done) {
    //     chai.request(app)
    //         .post('/items')
    //         .send({'name': 'Kale'})
    //         .end(function(err, res) {
    //             should.equal(err, null);
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.body.should.be.a('object');
    //             res.body.should.have.property('name');
    //             res.body.should.have.property('id');
    //             res.body.name.should.be.a('string');
    //             res.body.id.should.be.a('number');
    //             res.body.name.should.equal('Kale');
    //             storage.items.should.be.a('array');
    //             storage.items.should.have.length(4);
    //             storage.items[3].should.be.a('object');
    //             storage.items[3].should.have.property('id');
    //             storage.items[3].should.have.property('name');
    //             storage.items[3].id.should.be.a('number');
    //             storage.items[3].name.should.be.a('string');
    //             storage.items[3].name.should.equal('Kale');
    //             done();
    //         });
    // });

    // it('should delete an item from storage', function(done) {
    //     chai.request(app)
    //         .delete('/items/1')
    //         .end(function(err, res) {
    //             should.equal(err, null);
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.body.should.be.a('array');
    //             storage.items.should.have.length(3);
    //             storage.items[1].name.should.not.equal('Tomatoes');
    //             storage.items[1].id.should.not.equal('1');
    //             done();
    //         });
    // });

    // it('should modify an item from storage', function(done) {
    //     chai.request(app)
    //         .put('/items/2')
    //         .send({'name': 'monads', 'id': 2})
    //         .end(function(err, res) {
    //             should.equal(err, null);
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             storage.items[1].name.should.equal('monads');
    //             storage.items[1].id.should.equal(2);
    //             res.body.should.be.a('array');
    //             storage.items.should.have.length(3);
    //             done();
    //         });
    // });

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

describe('Shopping List', function () {

});
