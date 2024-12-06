const express = require('express')
const router = express.Router()
const {addExpense,filterExpenses, updateExpense,deleteExpense} =require('../controllers/expenseControllers')
const authenticatToken = require('../middlewares/authenticate')

router.post('/add',authenticatToken,addExpense)
router.put('/update/:id',authenticatToken, updateExpense )
router.delete('/delete/:id',authenticatToken,deleteExpense)
router.post('/filter',filterExpenses)


module.exports = router