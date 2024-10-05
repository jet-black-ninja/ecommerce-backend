import paypal from 'paypal-rest-sdk';

paypal.configure({
    mode: "sandbox",
    clientId: process.env.PAYPAL_ID,
    clientSecret:process.env.PAYPAL_SECRET,
})

export default paypal;