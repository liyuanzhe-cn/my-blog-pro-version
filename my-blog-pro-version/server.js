const express = require('express');
const server = express();
const PORT = process.env.PORT || 80;


server.listen(PORT);

server.use(express.static('./client/src/'))