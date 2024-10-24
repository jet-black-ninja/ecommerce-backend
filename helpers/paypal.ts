import paypal from 'paypal-rest-sdk';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

paypal.configure({
  mode: 'sandbox', // or 'live' for production
  client_id: process.env.PAYPAL_ID, // Correct key
  client_secret: process.env.PAYPAL_SECRET, // Correct key
});

export default paypal;
