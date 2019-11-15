const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get('/', (req, res) => {
  User
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(404).send('Users cannot be retrieved.')
      console.log(err)
    });
})

router.get('/:id', (req, res) => {
  User
    .findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
        console.log(`I found the user ${user}`);
      } else {
        res.status(404)
      }
    })
    .catch(err => {
      res.status(404).send('This user was not found.')
      console.log(err)
    });
})

router.post('/', (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  newUser.save(function (err, user) {
    if (user) {
      res.status(201).send(user);
    } else console.log(err);
  });
  console.log(user);
})

router.put('/:id', (req, res) => {
  User
    .findByIdAndUpdate(req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      })
    .then(users => {
      res.status(204).json(users);
    });
})

router.delete('/:id', (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .then(users => {
      if (users) {res.status(200).json(users);
        console.log(`Successfully deleted ${user}`)
      }
    })
    .catch(res.status(500).send('Cannot delete the user.'))
})

module.exports = router;
