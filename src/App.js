import Container from "react-bootstrap/Container";
import { useState, useCallback } from "react";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  const [orderPhase, setOrderPhase] = useState("order");
  const [orderNumber, setOrderNumber] = useState(null);
  let content = null;

  switch (orderPhase) {
    case "order":
      content = <OrderEntry />;
      break;
    case "summary":
      content = <OrderSummary />;
      break;
    case "confirmation":
      content = <OrderConfirmation />;
      break;
    default:
      content = <OrderEntry />;
      break;
  }

  return (
    <Container>
      <OrderDetailsProvider
        phase={{
          orderPhase,
          setOrderPhase: useCallback(setOrderPhase, [orderPhase]),
        }}
        orderNumber={{
          orderNumber,
          setOrderNumber: useCallback(setOrderNumber, [orderNumber]),
        }}
      >
        {/* Summary page and entry page need provider */}
        {content}
      </OrderDetailsProvider>
      {/* confirmation page does not need provider */}
    </Container>
  );
}

export default App;
