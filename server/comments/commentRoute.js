const express = require('express');
const commentCtrl = require('./commentCtrl');
const Joi = require('joi');
const { validateSchema } = require('../utils/validate');

const commentRoute = module.exports = express.Router();

const createCommentSchema = {
  event_id: Joi.string().alphanum().required(),
  user_id: Joi.string().alphanum().required(),
  content: Joi.string().alphanum().min(2).max(140).required(),
  created: Joi.date().required(),
};

const updateCommentSchema = {
  event_id: Joi.string().alphanum().required(),
  user_id: Joi.string().alphanum().required(),
  content: Joi.string().alphanum().min(2).max(140).required(),
  created: Joi.date(),
};

// assuming the route until now is /events/:event_id/comments
commentRoute.get('/', commentCtrl.getComments);
commentRoute.post('/', validateSchema(createCommentSchema), commentCtrl.createComment);
commentRoute.delete('/:comment_id', commentCtrl.deleteComment);
commentRoute.patch('/:comment_id', validateSchema(updateCommentSchema), commentCtrl.updateComment);
