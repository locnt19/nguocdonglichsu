const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.route('/me/:id')
  .get(auth, userController.getUser);

router.route('/me/logout')
  .get(auth, userController.logout);

router.route('/me/logoutall')
  .post(auth, userController.logoutAll);

router.route('/register')
  .get(userController.templateRegister)
  .post(userController.create);

router.route('/login')
  .get(userController.templateLogin)
  .post(userController.login);

module.exports = router;