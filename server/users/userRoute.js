const express = require('express');
const userCtrl = require('./userCtrl');
const Joi = require('joi');
const validate = require('../utils/validate');

const userRoute = module.exports = express.Router();

const createUserSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  last_name: Joi.string().alphanum().min(3).max(30).required(),
  dob: Joi.date().required(),
};

userRoute.delete('/:user_id', userCtrl.deleteUser);

userRoute.get('/', userCtrl.getUsers);
userRoute.get('/:user_id', userCtrl.getUserById);

userRoute.patch('/:user_id', userCtrl.updateUser);

userRoute.post('/', validate(createUserSchema), userCtrl.createUser);
