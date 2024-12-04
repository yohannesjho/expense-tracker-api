const express = require('express')
const router = express.Router()
const {addExpense,filterExpenses} =require('../controllers/expenseControllers')

router.post('/add',addExpense)
router.post('filter',filterExpenses)


module.exports = router