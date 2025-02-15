//Central Hub for routes
const router = require('express').Router();

//Import routes
const expensesRouter = require('./expenses');

//Use route handlers
router.use('/expenses', expensesRouter);

//Export router
module.exports = router;