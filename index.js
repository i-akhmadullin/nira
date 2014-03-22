var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var config = require('nconf');
var pg = require('pg');
var koa = require('koa');
var app = koa();

config.argv().env()
    .file({ file: 'configs/' + process.env.NODE_ENV + '.json' });
app.use(logger());
app.use(route.get('/', list));

/**
 * Post listing.
 */
var tasks;

function *list() {
    pg.connect(config.get('db'), function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * from tasks', function(err, result) {
            //call `done()` to release the client back to the pool
            done();
            if(err) {
                return console.error('error running query', err);
            }
            tasks = result.rows;
        });
    });
    this.body = yield render('list', { tasks: tasks });
}

app.listen(3000);
console.log('running on port 3000');
