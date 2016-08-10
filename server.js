'use strict';

const express = require('express');
const PORT = 3000;

const app = express();

app.use(express.static('app'));
app.get('/hello', function (req,resp) {
	resp.send('Hello there\n');
});

app.listen(PORT);
