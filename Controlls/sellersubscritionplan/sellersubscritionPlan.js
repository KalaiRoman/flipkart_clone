import Razorpay from 'razorpay';
import subscriobOrder from '../../Models/subscrionOrder/subscriobOrder.js';
import crypto from 'crypto';
import Seller_models from '../../Models/auth/Seller_models.js';



export const createOrderSubscription = async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: "rzp_test_EM3reg1Z7aUAw6",
            key_secret: "CY7By2M7qxBVMuqGPqZzRGe9",
        });
        const options = {
            amount: req.body.amount * 100,
            currency: req.body.currency,
        };
        try {
            const response = await razorpay.orders.create(options);
            if (response) {
                const planUpdate = await subscriobOrder({
                    planName: req.body.planName,
                    amount: response.amount,
                    order_id: response.id,
                    productList: req.body.productList,
                    user: req.userid,
                });
                await Seller_models.findByIdAndUpdate(req.userid, {
                    availableProducts: req.body.productList,
                    planName: req.body.planName
                }, { new: true })
                await planUpdate.save();
                res.status(200).json({
                    order_id: response.id,
                    currency: response.currency,
                    amount: response.amount,
                });
            } else {
                res.status(400).send('Unable to create order. Please try again!');
            }
        } catch (err) {
            console.error(err);
            res.status(400).send('Unable to create order. Please try again!');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};


export const FreeSubscriptionData = async (req, res) => {
    try {
        const planUpdate = await subscriobOrder({
            planName: req.body.planName,
            amount: req.body.amount,
            order_id: req.userid,
            productList: req.body.productList,
            user: req.userid,
        });
        await planUpdate.save();
        res.status(200).json({ message: "Free Paid Successfully" });
    } catch (error) {
        res.status(400).send('Unable to create order. Please try again!');
    }
}