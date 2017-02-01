const db = require('./categoryModel');
const logger = require('../logs/logger');

const categoryCtrl = {
  getCategoryDescription: (req, res) => {
      console.log('getCategoryDescription');
  },
  getCategory: (req, res) => {
    console.log('getCategory');
  },
  getCategories: (req, res) => {
    console.log('getCategories');
  }
};

module.exports = categoryCtrl;