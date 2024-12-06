const express = require('express')
const router = express.Router()
const {addExpense,filterExpenses, updateExpense} =require('../controllers/expenseControllers')
const authenticatToken = require('../middlewares/authenticate')

router.post('/add',authenticatToken,addExpense)
router.put('/update',authenticatToken, updateExpense )
router.post('/filter',filterExpenses)


module.exports = router