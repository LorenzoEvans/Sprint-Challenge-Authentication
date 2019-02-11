require('dotenv').config()
const axios = require('axios');
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
 const payload = {
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
  
  user.password = bcrypt.hashSync(user.password, 8)
  console.log(user)
  DB('users')
    .insert(user)
    .then(ids => {
     res.json({id: ids[0]})
       })
    .catch((err) => {
     res
      .status(500)
      .json({error: "There was an error registering user.", err: err})
     })
}

function login(req, res) {
  // implement user login
  const user = req.body
  DB('users')
  .where('username', user.username)
  .then((users) => {
   if (users.length && bcrypt.compareSync(user.password, users[0].password)) {
    const token = genToken(user)
    res.json({message: "You're logged in!", token})
     }
     else {
      res.status(401)
         .json({you: "shan't pass!"})
     }
    })
    .catch((err) => {
     res
      .status(400)
      .json(err)
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
