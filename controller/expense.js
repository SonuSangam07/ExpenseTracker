const Expense = require('../models/expense')

exports.addExpense = (req,res,next) => {
    const {amount,description,category} = req.body
    if(amount == undefined || amount.length === 0 
        || description == undefined || description.length === 0
        || category == undefined || category.length === 0)
        {
            return res.status(400).json({err:'Parameters Missing'})
        } else {
            Expense.create({amount,description,category})
            .then(expense=>{
                res.status(201).json({message:'Expense added',success:true,expense})

            })
            .catch(err=>{
                res.status(500).json({err:'Something went wrong'})
            })

}
}


exports.showExpense = (req,res,next)=>{
    Expense.findAll()
    .then(expenses=>{
        return res.status(200).json({expenses,success:true})
    })
}
exports.deleteexpense = (req, res) => {
    const expenseid = req.params.expenseid;
    Expense.destroy({where: { id: expenseid }}).then(() => {
        return res.status(204).json({ success: true, message: "Deleted Successfuly"})
    }).catch(err => {
        console.log(err);
        return res.status(403).json({ success: true, message: "Failed"})
    })
}