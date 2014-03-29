var config = require('../config');
var query = require('pg-query');

query.connectionParameters = config.db;

module.exports = query;
