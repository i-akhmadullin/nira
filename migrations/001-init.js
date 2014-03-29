require('migrate')(__dirname + '/.migrate');
var query = require('./query');
var multiline = require('multiline');
var upQuery = multiline(function(){/*
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY UNIQUE,
    name TEXT,
    text TEXT
);
INSERT INTO tasks (name, text) VALUES('Buy some milk', 'description');
INSERT INTO tasks (name, text) VALUES('Wash dishes', 'description\nsomething');
INSERT INTO tasks (name, text) VALUES('Walk the dog', 'task3 description description');
*/});
var downQuery = 'DROP TABLE tasks';

exports.up = function(next){

    query(upQuery, function(err, rows, result) {
        if(err) console.error(err)
        console.log('result', result);
        next();
    });
}

exports.down = function(next){
    query(downQuery, function(err, rows, result) {
        if(err) console.error(err)
        console.log('result', result);
        next();
    });
}
