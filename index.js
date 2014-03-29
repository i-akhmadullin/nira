var render = require('./lib/render');
var config = require('./config');
var logger = require('koa-logger');
var route = require('koa-route');
var koaPg = require('koa-pg');
var responseTime = require('koa-response-time');
var serve = require('koa-static');
var koa = require('koa');
var app = koa();

app.use(responseTime());
app.use(logger());
app.use(serve(__dirname + '/static'));
app.use(koaPg(config.db));
app.use(route.get('/', list));

function *list(){
    var result = yield this.pg.db.client.query_('SELECT * from tasks')
    var tasks = result.rows;
    this.body = yield render('list', { tasks: tasks });
}

app.listen(config.port);
console.log('running on port', config.port);

module.exports = app;
