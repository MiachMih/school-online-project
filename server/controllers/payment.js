require("dotenv").config();
const stripe = require("stripe")(process.env.PRIVATE_KEY);

exports.payment = async (req, res, next) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
