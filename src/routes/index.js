const router = require('express').Router();
const userRoutes = require('./user');
const { route } = require('./user');

router.get('/', (req, res) => {
	res.render('index.pug')
});
router.use('/users', userRoutes);

module.exports = router;