import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  render(<App />);

  //  add ice cream and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");
  const cherriesToppingInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await userEvent.click(cherriesToppingInput);

  // find and click order button
  const orderBtn = screen.getByRole("button", { name: /order/i });
  await userEvent.click(orderBtn);

  // check summary
  const scoopsTotal = screen.getByRole("heading", { name: /scoops \$.+$/i });
  expect(scoopsTotal).toHaveTextContent("Scoops $2");
  const toppingsTotal = screen.getByRole("heading", {
    name: /toppings \$.+$/i,
  });
  expect(toppingsTotal).toHaveTextContent("Toppings $1.5");
  const grandTotal = screen.getByRole("heading", { name: /total \$.+$/i });
  expect(grandTotal).toHaveTextContent("Total $3.5");

  // accept terms and conditions and click button to cofirm order
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to the Terms and Conditions",
  });
  await userEvent.click(checkbox);
  const button = screen.getByRole("button", "Confirm order");
  await userEvent.click(button);

  // confirm order number on confirmation page
  const orderNumber = await screen.findByRole("heading", {
    name: /your order number is \d+/i,
  });
  expect(orderNumber).toHaveTextContent("Your order number is 123456");

  // click order button on confirmation page
  const newOrderBtn = screen.getByRole("button", { name: /create new order/i });
  await userEvent.click(newOrderBtn);

  // check that scoops and topping subtotals have reset on order page
  const vanillaScoopInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const cherryTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  //   expect(vanillaInput).toHaveValue(0);
  //   expect(cherryTopping).toHaveValue(0);
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");
  const orderGrandTotal = screen.getByRole("heading", {
    name: /grand total: \$/i,
  });
  expect(orderGrandTotal).toHaveTextContent("0.00");
});