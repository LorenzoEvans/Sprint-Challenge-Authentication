const axios = require('axios');
require('dotenv').config()
const bcrypt = require("bcryptjs")
const DB = require('../database/dbConfig')
const jwt = require('jsonwebtoken')

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const genToken = (user) => {
 const payL = {
  username: user.username,
 }

 const secret = process.env.JWT_SEC 

 const options = {
  expiresIn: '24h',
  jwtid: '10101010ls'
 }
 
 return jwt.sign(payload, secret, options)
}

function register(req, res) {
  // implement user registration
  const user = req.body
  const id, token 
  user.password = bcrypt.hashSync(user.password, 16)
  DB('users')
    .insert(user)
    .then(ids => {
     id = ids[0]
     DB('users')
       .where({id: id})
       .first()
       .then((user) => {
        token = genToken(user)
       })
       .catch(() => {
        res
         .status(401)
         .json({error: "Error generating token or token invalid."})
       })
    })
    .catch(() => {
     res
      .status(500)
      .json({error: "There was an error registering user."})
    })
}

function login(req, res) {
  // implement user login
  const user = req.body
  DB('users')
    .where('username', user.username)
    .then((users) => {

    })
    .catch(() => {

    })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
