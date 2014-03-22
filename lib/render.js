var views = require('co-views');

// setup views mapping .html to jade template engine
module.exports = views(__dirname + '/../views', {
  map: { html: 'jade' }
});
