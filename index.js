var koa = require('koa');
var logger = require('koa-logger');
var app = koa();

// logger
app.use(logger());

// response
app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);
console.log('running on port 3000');
