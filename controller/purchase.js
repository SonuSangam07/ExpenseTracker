const Razorpay = require('razorpay');
const Order = require('../models/orders')


const purchasepremium =async (req, res) => {
    try {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        var rzp = new Razorpay({
            key_id: 'rzp_test_DV1Vray3AurAUk',
            key_secret: '5GoOwAqJdytZmB4Q9vYmZjnP'
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(err);
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err})
    }
}

 const updateTransactionStatus = (req, res ) => {
    try {
        const { payment_id, order_id} = req.body;
        Order.findOne({where : {orderid : order_id}}).then(order => {

            order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}).then(() => {
                console.log('aaaaaaaaaaaaaaaa')
                req.user.update({ ispremiumuser: true });
                return res.status(202).json({sucess: true, message: "Transaction Successful"})
                
                ;
            }).catch((err)=> {
                throw new Error(err);
            })
        }).catch(err => {
            throw new Error(err);
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}