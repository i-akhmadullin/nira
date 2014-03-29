var render = require('./lib/render');
var config = require('./config');
var logger = require('koa-logger');
var route = require('koa-route');
var koaPg = require('koa-pg');
var koa = require('koa');
var app = koa();

app.use(logger());
app.use(koaPg(config.get('db')));
app.use(route.get('/', list));

function *list(){
    // Here we have access to this.pg which is client returned from pg.connect().
    var result = yield this.pg.db.client.query_('SELECT * from tasks')
    var tasks = result.rows;
    this.body = yield render('list', { tasks: tasks });
}

app.listen(3000);
console.log('running on port 3000');
