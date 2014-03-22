var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var app = koa();

app.use(logger());

app.use(route.get('/', list));

/**
 * Post listing.
 */
// var tasks = [{ title:'todo1', text: 'description' }, {title: 'todo2', text: 'description2\nline2' }]
var tasks;
var pg = require('pg');
var conString = "postgres://postgres:postgres@localhost/nira";


function *list() {
    pg.connect(conString, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * from tasks', function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }
            console.log(result.rows[0].numbor);
            //output: 1
            tasks = result.rows;
        });
    });
    this.body = yield render('list', { tasks: tasks });
}

app.listen(3000);
console.log('running on port 3000');
