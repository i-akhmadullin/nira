process.env.NODE_ENV = 'test';

var request = require('supertest');
var app = require('../index').listen();
app = request(app);

describe('basic', function(){
    it('main page should work', function(done){
        app.get('/')
            .expect(200)
            .end(function(err){
                if (err) return done(err);
                done();
            });
    })
})
