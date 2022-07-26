import Container from "react-bootstrap/Container";

import { useOrderDetails } from "../../contexts/OrderDetails";
import SummaryForm from "./SummaryForm";

function OrderSummary() {
  const [OrderDetails] = useOrderDetails();

  return (
    <Container>
      <h1>Order Summary</h1>

      <h3>Scoops {OrderDetails.totals.scoops}</h3>
      <ul>
        {Array.from(OrderDetails.scoops.keys()).map((scoop) => (
          <li key={scoop}>{scoop}</li>
        ))}
      </ul>

      <h3>Toppings {OrderDetails.totals.toppings}</h3>
      <ul>
        {Array.from(OrderDetails.toppings.keys()).map((topping) => (
          <li key={topping}>{topping}</li>
        ))}
      </ul>

      <h3>Total {OrderDetails.totals.grandTotal}</h3>

      <SummaryForm />
    </Container>
  );
}

export default OrderSummary;
