var config = require('config-node');

module.exports = config({
    dir: 'configs',
    ext: 'json',
    env: process.env.NODE_ENV || 'development'
});
