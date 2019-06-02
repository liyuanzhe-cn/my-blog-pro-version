const express = require('express');
const server = express();
const PORT = process.env.PORT || 8080;


server.listen(PORT);

server.use(express.static('./client/src/'))