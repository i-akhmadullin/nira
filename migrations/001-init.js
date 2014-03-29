require('migrate')(__dirname + '/.migrate');
var query = require('./query');
var multiline = require('multiline');
var upQuery = multiline(function(){/*
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY UNIQUE,
    name TEXT,
    text TEXT
);
INSERT INTO tasks (name, text) VALUES('task1', 'description');
INSERT INTO tasks (name, text) VALUES('task2', 'description\nsomething');
INSERT INTO tasks (name, text) VALUES('task3', 'task3 description description');
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
