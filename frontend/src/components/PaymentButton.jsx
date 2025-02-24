import axios from "axios";
const VITE_APP_API = import.meta.env.VITE_APP_API;

const PaymentButton = ({ job, client, freelancer, amount }) => {
    const handlePayment = async () => {
        try {
            const { data } = await axios.post(`${VITE_APP_API}/api/payment/create-order`, {
                job,
                client, 
                freelancer, 
                amount,
                currency: "INR",
            });

            const { id, amount: orderAmount, currency } = data.order;

            // ✅ Step 2: Open Razorpay Checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Store in .env
                amount: orderAmount,
                currency,
                name: "Freelancing Platform",
                description: "Payment for Hiring Freelancer",
                order_id: id,
                handler: async (response) => {
                    // ✅ Step 3: Verify Payment & Hire Freelancer
                    await axios.post(`${VITE_APP_API}/api/payment/verify-payment`, {
                        ...response,
                        job,
                        client,
                        freelancer,
                        amount,
                    });
                    alert("Payment Successful! Freelancer Hired!");
                },
                prefill: {
                    name: "John Doe",
                    email: "john@example.com",
                    contact: "9999999999",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={handlePayment} className="px-4 py-2 bg-blue-500 text-white rounded">
            Pay ₹{amount} to Hire
        </button>
    );
};

export default PaymentButton;
