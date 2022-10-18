import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Options from "./Options";
import { useDispatch } from "react-redux";
import { getClientSecret } from "../../../store/payment-slice";
import styles from "./Billing.module.css";

const stripePromise = loadStripe(
  "pk_test_51LtxpNHQOPdk7PQDqFPUYjcLc4vv5KToalPosCCV7i9W8bipXjXSY7e6kZHqop2Am1uDqLrH8eSWeaKIqhzbcjkv00t3sLIhzP"
);

function Billing() {
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    async function fetchClientSecret() {
      const response = await dispatch(
        getClientSecret({ amount: amount * 100 })
      );
      setClientSecret(response);
    }
    fetchClientSecret();
  }, [amount]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className={styles.container}>
      <div className={styles.Billing}>
        <Options setAmount={setAmount} currentFocus={amount} />
        {clientSecret && (
          <Elements key={clientSecret} options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default Billing;
