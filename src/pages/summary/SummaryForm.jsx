import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from "axios";

import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../../common/AlertBanner";

export default function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);
  const [error, setError] = useState(false);
  const [OrderDetails] = useOrderDetails();

  const orderSubmitHandler = async () => {
    await axios
      .post("http://localhost:3030/order")
      .then((response) =>
        OrderDetails.orderNumber.setOrderNumber(response.data.orderNumber)
      )
      .catch((error) => {
        setError(true);
      });
    OrderDetails.phase.setOrderPhase("confirmation");
  };

  const popover = (
    <Popover>
      <Popover.Body id="termsandconditions-popover">
        No ice cream will actually be delivered
      </Popover.Body>
    </Popover>
  );

  const errMsg = error ? <AlertBanner /> : null;

  const checkboxLabel = (
    <span>
      I agree to the{" "}
      <OverlayTrigger overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="button"
        disabled={!tcChecked}
        onClick={orderSubmitHandler}
      >
        Confirm order
      </Button>
      {errMsg}
    </Form>
  );
}
