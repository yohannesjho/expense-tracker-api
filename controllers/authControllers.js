const bcrypt = require('bcrypt')
const db = require('../models/db')
const jwt = require('jsonwebtoken')


async function SignUp (req,res){
    const {name,email,password} = req.body

    try {
        const hashedPassword = await bcrypt.hash(password,10)
         
         const [result]  = await db.query(
            'INSERT INTO users(name,email,password) VALUES(?,?,?)',
            [name,email,hashedPassword]
        )
        res.status(201).send('user is registered')
    } catch (error) {
        console.log(error)
        res.status(500).send('error signing up')
    }
}

async function SignIn (req,res){
    const {email,password} = req.body
    console.log(email,password)
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?',[email])
      
        if(users.length == 0) return res.status(401).send('invalid credentials')
        const user = users[0]
        
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) return res.status(401).send('invalid credential')
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.json({token})
    } catch (error) {
        res.status(500).send('error signing')
    }
}

module.exports = { SignUp,SignIn}