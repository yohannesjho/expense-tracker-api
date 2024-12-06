const db = require('../models/db')



async function addExpense(req, res) {
    const { amount, description, category, date } = req.body
    console.log(req.body)

    try {
        const [result] = await db.query('INSERT INTO expenses(user_id, amount, description,  category, date) VALUES (?,?,?,?,?)', [req.user.id, amount, description, category, date])
        res.status(201).send('expense added')
    } catch (error) {
        console.log(error)
        res.status(500).send('error adding expense')
    }
}
async function updateExpense(req, res) {
    const { amount, description, category } = req.body
    console.log(amount,description, category, req.params)
    try {
        const [result] = await db.query(
            'UPDATE expenses SET amount = ?, description = ?, category = ? WHERE user_id = ? AND id = ?',
            [amount, description, category, req.user.id, req.params.id]
        );
        
        res.status(201).send('expense updated')
    } catch (error) {
        console.log(error)
        res.status(500).send('error updatig expense')
    }
}

async function deleteExpense(req,res){
    try {
        const [result] = await db.query('DELETE FROM expenses WHERE user_id = ? AND id = ?',
            [req.user.id, req.params.id]
        )
        res.status(201).send('expense deleted successfully')
    } catch (error) {
        res.status(500).send('error deleteing expense')
    }
}

async function filterExpenses(req, res) {
    const { filter, start, end } = req.query
    const query = 'SELECT * FROM expenses WHERE user_id = ?'
    const params = [req.user.id]

    try {
        if (filter === 'week') {
            query += 'AND date >= DATE_SUB(CURDATE, INTERVAL 1 WEEK'
        }
        else if (filter === 'month') {
            query += 'AND date >= DATE_SUB(CURDATE, INTERVAL 1 MONTH'
        }
        else if (filter === 'custom') {
            query += 'AND date BETWEEN ? AND ?'
            params.push(start, end)
        }
        const [expenses] = await db.query(query, params)
        res.json(expenses)
    } catch (error) {
        res.status(500).send('error fetching expenses')
    }
}

module.exports = { addExpense, filterExpenses, updateExpense,deleteExpense }

