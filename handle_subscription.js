import create_payment_method from './libs/create_payment_method';
import create_customer from './libs/create_customer';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const main = async (event, context, callback) => {
  const requestBody = JSON.parse(JSON.stringify(event.body));
  const email = requestBody.email;
  const number = requestBody.number;
  const exp_month = requestBody.exp_month;
  const exp_year = requestBody.exp_year;
  const cvc = requestBody.cvc;

  const payment_method = await create_payment_method(number,exp_month,exp_year,cvc);
  const customer = await create_customer(email,payment_method.body.card.id);

  return stripe.subscriptions.create({ // Create Stripe charge with token
    customer: customer.body.customer.id,
    items: [
        {price: 'price_1HEPBFAaunfSpyNLZf2LO88Y'},
    ],
  })
    .then((subscription) => { // Success response
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: {
          message: `subscription created`,
          subscription,
        },
      };
      callback(null, response);
    })
    .catch((err) => { // Error response
      const response = {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: err.message,
        }),
      };
      callback(null, response);
    });
};