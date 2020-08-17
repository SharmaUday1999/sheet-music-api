const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default function create_payment_method(number,exp_month,exp_year,cvc){

    return stripe.paymentMethods.create({ // Create Stripe charge with token
        type: 'card',
        card: {
            number,
            exp_month,
            exp_year,
            cvc,
        },
    })
        .then((card) => { // Success response
        return {
            statusCode: 200,
            headers: {
            'Access-Control-Allow-Origin': '*',
            },
            body: {
            message: `Card created`,
            card,
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