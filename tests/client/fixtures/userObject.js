const { encryptPassword } = require('../../../server/utils/validate');

module.exports = {
  _id: 1,
  email: 'test@xyz.io',
  password: encryptPassword('Shoes2231'),
  first_name: 'Tony',
  last_name: 'Tiger',
  dob: '2017-10-1',
  bio: 'Ate a lot of sugar. Grew up to be GRRRREEEAAAAAT!',
  image_url: 'http://placekitten.com/g/250/250',
  following: [2, 3],
  followers: [2, 3],
};
