import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect, Suspense, useCallback } from "react";

import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../../common/AlertBanner";

function OrderConfirmation({ setOrderPhase }) {
  const [, , resetCounts] = useOrderDetails();
  const [error, setError] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {
        setError(true);
      });
    setOrderPhase("completed");
  }, [setOrderPhase]);

  const newOrderHandler = () => {
    resetCounts();
    setOrderPhase("inProgress");
  };

  const errMsg = error ? <AlertBanner /> : null;

  return (
    <Container>
      {orderNumber ? (
        <>
          <h1>Thank you!</h1>
          <h3>Your order number is {orderNumber}</h3>
          <p>As per our terms and conditions, nothing will happen now</p>
          <Button variant="primary" onClick={newOrderHandler}>
            Create new order
          </Button>
          {errMsg}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default OrderConfirmation;
