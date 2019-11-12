
const express = require('express');

const Users = require('./userModel');
const restricted = require('../auth/restricted-middleware');

const router = express.Router();

router.get('/', restricted, (req, res) => {
  Users.find()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    res.status(500).json(error)
  });
});


// router.get('/:id', restricted, (req, res) => {
//   Users.findById(req.params.id)
  
// })

module.exports = router;


