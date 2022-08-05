import { Button } from "react-bootstrap";

import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry({ setOrderPhase }) {
  const [OrderDetails] = useOrderDetails();
  const disabled = OrderDetails.totals.scoops === "$0.00";

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {OrderDetails.totals.grandTotal}</h2>
      <Button
        variant="primary"
        onClick={() => setOrderPhase("review")}
        disabled={disabled}
      >
        Order
      </Button>
    </div>
  );
}
