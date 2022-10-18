const paymentController = require("../controllers/payment");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/create-payment-intent", auth, paymentController.payment);

module.exports = router;
