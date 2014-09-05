process.env.NODE_ENV = 'development';

var pg = require('pg');
var config = require('../config');
var client = new pg.Client(config.db);

describe('dev db', function(){
    it('should be able to connect to dev db', function(done){
        client.connect(function(err) {
            if(err) { done(err); }
            else { done(); }
        });
    });
});
