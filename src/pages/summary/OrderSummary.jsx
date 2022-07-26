import Container from "react-bootstrap/Container";

import { useOrderDetails } from "../../contexts/OrderDetails";
import SummaryForm from "./SummaryForm";
import OptionSummary from "./OptionSummary";

function OrderSummary() {
  const [OrderDetails] = useOrderDetails();

  return (
    <Container>
      <h1>Order Summary</h1>

      <OptionSummary optionType="scoops" />
      <OptionSummary optionType="toppings" />

      <h3>Total {OrderDetails.totals.grandTotal}</h3>

      <SummaryForm />
    </Container>
  );
}

export default OrderSummary;
