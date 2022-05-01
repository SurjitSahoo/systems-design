const express = require('express');

const server = express();

server.get('/hello', (req, res) => {
	res.send('Hello World');
});

server.listen(3000, () => {
	console.log('Server started');
	console.log('http://localhost:3000/hello');
});