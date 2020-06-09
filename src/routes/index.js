const router = require('express').Router();
const userRoutes = require('./user');

router.use('/api/users', userRoutes);

module.exports = router;