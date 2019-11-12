const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../users/userModel');

const router = express.Router();

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 11)
  const newUser = {
    username: req.body.username,
    password: hash
  };

  Users.add(newUser) 
    .then(saved => {
      res.status(200).json(saved)
    })
    .catch(error => {
      res.status(500).json({
        error: `Error adding new user ${error.message}`
      });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({
        message: `Welcome aboard ${user.username}`
      })
    } else {
      res.status(401).json({
        message: `Invalid username or password`
      })
    }
  })
  .catch(error => {
    res.status(500).json(error)
  });
});

// function restricted(req, res, next) {
//   const {username, password} = req.headers;
//   Users.findBy({ username })
//   .first()
//   .then(user => {
//     if(user && bcrypt.compareSync(password, user.password)) {
//       next()
//     } else {
//       res.status(400).json({
//         message: `Invalid credentials, you shall not pass!`
//       })
//     }
//   })
//   .catch(error => {
//     res.status(500).json({
//       message: error.message
//     })
//   })
// }

module.exports = router;