process.env.NODE_ENV = 'test';

var pg = require('pg');
var config = require('../config');
var client = new pg.Client(config.db);

describe('test db', function(){
    it('should be able to connect to test db', function(done){
        client.connect(function(err) {
            if(err) { done(err); }
            else { done(); }
        });
    });
});
