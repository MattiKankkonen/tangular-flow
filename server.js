'use strict';

const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'app')));

// image upload POST handling here
app.use(bodyParser.urlencoded({extended: true, limit:'3mb', parameterLimit:'10000'}));
var storage = multer.diskStorage({
    destination: path.join(__dirname, 'app/images'),
    filename: function(req, file, cb) {
        cb(null, 'img.jpg');
    }
});
var upload = multer({ storage: storage });


app.post('/imgsrv', upload.any(), function(req, res, next) {   
    res.status(204).end();
});

// for pinging the server
app.get('/hello', function (req,resp) {
    resp.send('Hello there\n');
});

app.listen(app.get('port'), function() {
    console.log('Server started listen port:' + app.get('port'));
});
