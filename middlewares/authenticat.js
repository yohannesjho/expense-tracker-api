const jwt = require('jsonwebtoken')

function authenticatToken (req,res,next){
    const token = req.header('Autorization')
    if(!token) res.status(401).send('Access denied')

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.status(403).send('Acess denied')
        req.user.user
       next()
    })
}

module.exports = authenticatToken