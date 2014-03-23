var config = require('nconf');

module.exports = config.argv().env().file({
    file: 'configs/' + process.env.NODE_ENV + '.json'
});
