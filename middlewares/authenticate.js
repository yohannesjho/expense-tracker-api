const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const header = req.header('Authorization');  
    if (!header) {
        return res.status(401).send('Access denied');  
    }

    const token = header.split(' ')[1];  
    if (!token) {
        return res.status(401).send('Access denied'); 
    }
    
    


    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        
        if (err) {
            console.error(err); 
            return res.status(403).send('Access denied'); 
        }
        req.user = user;
        
        next();  
    });
}


module.exports = authenticateToken