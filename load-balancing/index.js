const express = require('express');

const server = express();
const PORT = process.env.PORT;

server.get('/hello', (req, res) => {
	res.send('Hello from ' + PORT);
});

server.listen(PORT, () => {
	console.log('Server started at ' + PORT);
});