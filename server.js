'use strict';

const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static('app'));
app.get('/hello', function (req,resp) {
    resp.send('Hello there\n');
});

app.listen(app.get('port'), function() {
    console.log('Server started listen port:' + app.get('port'));
});
