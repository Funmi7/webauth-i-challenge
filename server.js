const express = require('express');
const helmet = require('helmet');
const session = require('express-session');

const authRouter = require('./auth/authRouter') 
const userRouter = require('./users/userRouter');

const server = express();

const sessionConfig = {
  name: 'notsession',
  secret: 'you do not want to know the secret!',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: false
  },
  resave: false,
  saveUninitialized: false,
  // store: new knexSessionStore({
  //   knex: require('./data/dbConfig')
  // })
}
server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig))

server.get('/', (req, res) => {
  res.send('server running')
})

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

module.exports = server;