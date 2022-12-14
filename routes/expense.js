const expenseController =  require('../controller/expense')
const authentication = require('../middleware/authenticator')

const express = require('express')

const router =  express.Router()

router.post('/addexpense', authentication.authenticate,expenseController.addExpense)

router.get('/getexpense',authentication.authenticate, expenseController.showExpense)

router.delete('/deleteuser/:expenseid',authentication.authenticate,expenseController.deleteexpense)
router.get('/getallusers', expenseController.showExpensePremium)
router.get('/download',authentication.authenticate,expenseController.downloadExpense)
router.get('/getallexpense/:id', expenseController.seeExpensePremium)
module.exports = router