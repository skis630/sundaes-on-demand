import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { useOrderDetails } from "../../contexts/OrderDetails";

function OrderConfirmation() {
  const [OrderDetails, updateItemCount] = useOrderDetails();

  function resetCounts() {
    const scoopOptions = [...OrderDetails.scoops.keys()];
    const toppingOptions = [...OrderDetails.toppings.keys()];

    // reset option counts to zero
    scoopOptions.forEach((scoopItem) =>
      updateItemCount(scoopItem, "0", "scoops")
    );
    toppingOptions.forEach((toppingItem) =>
      updateItemCount(toppingItem, "0", "toppings")
    );
  }

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
