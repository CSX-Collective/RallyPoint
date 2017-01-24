const express = require('express');
const userCtrl = require('./userCtrl');
const Joi = require('joi');
const { validateSchema } = require('../utils/validate');

const userRoute = module.exports = express.Router();

const createUserSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})/).required(),
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  last_name: Joi.string().alphanum().min(3).max(30).required(),
  dob: Joi.date().required(),
};

const loginUserSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})/).required(),
};

const updateUserSchema = {
  email: Joi.string().email(),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})/),
  first_name: Joi.string().alphanum().min(3).max(30),
  last_name: Joi.string().alphanum().min(3).max(30),
  dob: Joi.date(),
};

userRoute.delete('/:user_id', userCtrl.deleteUser);

userRoute.get('/', userCtrl.getUsers);
userRoute.get('/:user_id', userCtrl.getUserById);

userRoute.patch('/:user_id', validateSchema(updateUserSchema), userCtrl.updateUser);

userRoute.post('/', validateSchema(createUserSchema), userCtrl.createUser);
userRoute.post('/login', validateSchema(loginUserSchema), userCtrl.loginUser);
