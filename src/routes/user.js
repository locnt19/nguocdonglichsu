const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.route('/me')
  .get(auth, userController.getUser);

router.route('/logout')
  .get(auth, userController.logout);

router.route('/change-password')
  .get(auth, userController.templateChangePassword)
  .post(auth, userController.changePassword);

router.route('/register')
  .get(userController.templateRegister)
  .post(userController.create);

router.route('/login')
  .get(userController.templateLogin)
  .post(userController.login);

module.exports = router;