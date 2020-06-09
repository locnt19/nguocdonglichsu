const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');


router.route('/')
  .get(userController.getAllUsers);

router.route('/me')
  .get(auth, userController.getUser);

router.route('/me/logout')
  .post(auth, userController.logout);

router.route('/me/logoutall')
  .post(auth, userController.logoutAll);

router.route('/register')
  .post(userController.create);

router.route('/login')
  .post(userController.login);

module.exports = router;