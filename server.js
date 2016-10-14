var http = require('http');
var express = require('express');
var multer  = require('multer');
var upload = multer();
var app = express();

app.post('/get-file-size', upload.single('file'), function(req, res, next) {
    if (!req.file) {
        res.statusCode=400;
        res.end("Internal Server Error");
    } else {
        res.statusCode=200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('{"size": ' + req.file.size + '}');
    }
});

app.get('/', function(req, res, next) {
    var page = '<p>Submit a file to view its filesize.</p>' +
        '<form action="/get-file-size" method="post" enctype="multipart/form-data">' +
            '<input type="file" name="file">' +
            '<input type="submit">' +
        '</form>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(page));
    res.end(page);
});

app.listen(3000);
