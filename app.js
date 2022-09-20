const express = require('express')

const bodyParser = require('body-parser');

const app = express()

const cors =  require('cors')

app.use(cors())

const sequelize = require('./util/database');

app.use(bodyParser.json());

const User = require('./models/user')

const Expense = require('./models/expense')

User.hasMany(Expense)
Expense.belongsTo(User)

const userRoute = require('./routes/user')
const expenseRoute=require('./routes/expense')

app.use('/users',userRoute)
app.use('/expense',expenseRoute)
sequelize.sync()
.then(result=>{
    app.listen(3000)
})
.catch(err=>console.log(err))