const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.route('/')
  .get(adminController.templateDashboard);

router.route('/users')
  .get(adminController.templateUsers)

router.route('/thoi-gian-thi')
  .get(adminController.templateThoiGianThi)
  .post(adminController.setThoiGianThi)

module.exports = router;