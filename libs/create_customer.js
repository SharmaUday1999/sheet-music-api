const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default function create_payment_method(email, payment_method_id){

 return stripe.customers.create({ // Create Stripe charge with token
    email,
    payment_method: payment_method_id,
    invoice_settings: {
      default_payment_method: payment_method_id,
    }
  })
    .then((customer) => { // Success response
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: {
          message: `Customer created`,
          customer,
        },
      };
    })
    .catch((err) => { // Error response
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: err.message,
        }),
      };
    });
};