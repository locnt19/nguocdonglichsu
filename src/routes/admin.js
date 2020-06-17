const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('admin/dashboard.pug')
});

router.get('/users', (req, res) => {
	res.render('admin/users.pug')
});

module.exports = router;