const express = require('express')
const router = express.Router()
const {addExpense,filterExpenses, updateExpense,deleteExpense,getAllExpenses} =require('../controllers/expenseControllers')
const authenticatToken = require('../middlewares/authenticate')

router.post('/add',authenticatToken,addExpense)
router.get('/expenses',authenticatToken,getAllExpenses)
router.put('/update/:id',authenticatToken, updateExpense )
router.delete('/delete/:id',authenticatToken,deleteExpense)

router.post('/filter',filterExpenses)


module.exports = router