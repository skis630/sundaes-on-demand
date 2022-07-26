import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { useOrderDetails } from "../../contexts/OrderDetails";

function OrderConfirmation() {
  const [OrderDetails, resetCounts] = useOrderDetails();
  const newOrderHandler = () => {
    resetCounts();
    OrderDetails.phase.setOrderPhase("order");
  };

  return (
    <Container>
      <h1>Thank you!</h1>
      <h3>Your order number is {OrderDetails.orderNumber.orderNumber}</h3>
      <p>As per our terms and conditions, nothing will happen now</p>
      <Button variant="primary" onClick={newOrderHandler}>
        Create new order
      </Button>
    </Container>
  );
}

export default OrderConfirmation;
