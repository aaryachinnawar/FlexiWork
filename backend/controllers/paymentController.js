import Stripe from 'stripe';
import Payment from '../models/Payment.js';

const stripe = new Stripe("sk_test_51Qu7pcBh8AcpjXMso6tzV5XHRlU4xVoE68WEqirNUaGmpkxpcUsrt3fkirZyAZHtrpbYTUwPJIuvWOgC6B7jOdXf00WfXTtu2l");

export const processPayment = async (req, res) => {
    try{
        const { amount, jobId, clientId, freelancerId, paymentMethodId } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount*100,
            currency: 'usd',
            payment_method: paymentMethodId,
            confirmation_method:"manual",
            confirm:true
        });
        const payment = new Payment({
            job: jobId,
            client: clientId,
            freelancer: freelancerId,
            amount: paymentIntent.amount,
            status: paymentIntent.status,
        });
        await payment.save();
        res.json({ clientSecret: paymentIntent.client_secret });
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
