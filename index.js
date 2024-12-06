const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const authRouter = require('./routes/authRoutes')
const expenseRouter = require('./routes/expenseRouter')

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(bodyParser.json())

app.use('/api/auth',authRouter)
app.use('/api/expense',expenseRouter)

app.listen(PORT,(req,res)=>{
   console.log(`server is running on port ${PORT}`)
})