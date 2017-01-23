const { encryptPassword } = require('../../../server/utils/validate');

module.exports = {
 _id: 1,
 email: 'test@xyz.io',
 password: encryptPassword('shoes2231'),
 first_name: 'Tony',
 last_name: 'Tiger',
 dob: '2017-10-1',
};
