const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.route('/me/:id')
  .get(auth, userController.getUser);

router.route('/logout')
  .get(auth, userController.logout);

// router.route('/logoutall')
//   .get(auth, userController.logoutAll);

router.route('/register')
  .get(userController.templateRegister)
  .post(userController.create);

router.route('/login')
  .get(userController.templateLogin)
  .post(userController.login);

module.exports = router;