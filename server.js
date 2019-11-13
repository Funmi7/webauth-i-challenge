const express = require('express');
const helmet = require('helmet');
const server = express();

const userRouter = require('./users/userRouter');

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('server running')
})

server.use('/api/users', userRouter)

module.exports = server;