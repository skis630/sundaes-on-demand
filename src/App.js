import Container from "react-bootstrap/Container";
import { useState, useCallback } from "react";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");
  let Content = null;

  switch (orderPhase) {
    case "inProgress":
      Content = OrderEntry;
      break;
    case "review":
      Content = OrderSummary;
      break;
    case "completed":
      Content = OrderConfirmation;
      break;
    default:
      Content = OrderEntry;
      break;
  }

  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        {<Content setOrderPhase={useCallback(setOrderPhase, [orderPhase])} />}
      </OrderDetailsProvider>
      {/* confirmation page does not need provider */}
    </Container>
  );
}

export default App;
