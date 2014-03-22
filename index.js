var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var config = require('nconf');
var pg = require('pg');
var koaPg = require('koa-pg');
var koa = require('koa');
var app = koa();

config.argv().env()
    .file({ file: 'configs/' + process.env.NODE_ENV + '.json' });

app.use(koaPg(config.get('db')));
app.use(logger());
app.use(route.get('/', list));

function *list() {
    // Here we have access to this.pg which is client returned from pg.connect().
    var result = yield this.pg.db.client.query_('SELECT * from tasks')
    var tasks = result.rows;
    this.body = yield render('list', { tasks: tasks });
}

app.listen(3000);
console.log('running on port 3000');
