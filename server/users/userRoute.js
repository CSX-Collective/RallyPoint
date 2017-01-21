const express = require('express');

const userRoute = module.exports = express.Router();

userRoute.get('/', (req, res, next) => res.send('testing'));
userRoute.post('/');
