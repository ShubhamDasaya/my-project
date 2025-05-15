import Rozorpay from 'razorpay';
const rozorpay = new Rozorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

export default rozorpay;