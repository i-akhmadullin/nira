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
var tasks = [{ title:'todo1', text: 'description' }, {title: 'todo2', text: 'description2\nline2' }]
function *list() {
  this.body = yield render('list', { tasks: tasks });
}

app.listen(3000);
console.log('running on port 3000');
