const express = require('express')

const bodyParser = require('body-parser');

const app = express()

const cors =  require('cors')

app.use(cors())

const sequelize = require('./util/database');

app.use(bodyParser.json());
const dotenv = require('dotenv')

dotenv.config();

const User = require('./models/user')
const Order = require('./models/orders');
const Expense = require('./models/expense')

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order);
Order.belongsTo(User);

const userRoute = require('./routes/user')
const expenseRoute=require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
app.use('/purchase',purchaseRoutes)
app.use('/users',userRoute)
app.use('/expense',expenseRoute)
sequelize.sync()
.then(result=>{
    app.listen(3000)
})
.catch(err=>console.log(err))