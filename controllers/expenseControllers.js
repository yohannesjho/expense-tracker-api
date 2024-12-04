const db = require('../models/db')


async function addExpense(req,res){
    const {amount, descripion,category,date} = req.body
    try {
       const [result] =  await db.query('INSERT INTO expenses VALUES ?,?,?,?,?',[amount, descripion,date,category])
       res.status(201).rend('expense added')
    } catch (error) {
        res.status(500).send('error adding expense')
    }
}