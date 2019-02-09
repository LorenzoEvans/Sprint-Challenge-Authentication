const axios = require('axios');
const bcrypt = require("bcryptjs")
const db = require('../database/dbConfig')

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const genToken = (user) => {
 const payL = {
  username: user.username
 }

 const secret = "antidisestablishmentarianism"

 const options = {
  expiresIn: '24h',
 }
}

function register(req, res) {
  // implement user registration
  const user = req.body
}

function login(req, res) {
  // implement user login
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
