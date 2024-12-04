const db = require('../models/db')


async function addExpense(req, res) {
    const { amount, descripion, category, date } = req.body

    try {
        const [result] = await db.query('INSERT INTO expenses VALUES ?,?,?,?,?', [amount, descripion, date, category])
        res.status(201).rend('expense added')
    } catch (error) {
        res.status(500).send('error adding expense')
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

module.exports = {addExpense,filterExpenses}

