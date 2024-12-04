const bcrypt = require('bcrypt')
const db = require('../models/db')


async function SignUp (req,res){
    const {name,email,password} = req.body

    try {
        const hashedPassword = await bcrypt.hash(password,10)
     const [result]  = await db.query(
            'INSERT INTO user(name,email,password) VALUES(?,?,?)'
            [name,email,hashedPassword]
        )
        res.status(201).send('user is registered')
    } catch (error) {
        res.status(500).send('error signing up')
    }
}

module.exports = { SignUp}