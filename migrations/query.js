var config = require('../config');
var query = require('pg-query');

query.connectionParameters = config.get('db');

module.exports = query;
