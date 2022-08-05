import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("order button is disabled if no scoops are ordered", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  // no scoops added
  const orderButton = screen.getByRole("button", { name: /order/i });
  expect(orderButton).toBeDisabled();

  //   add 1 scoop of vanilla and 1 scoop of chocolate
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");
  const chocolateInput = screen.getByRole("spinbutton", {
    name: "Chocolate",
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, "1");

  const enabledOrderButton = screen.getByRole("button", { name: /order/i });
  expect(enabledOrderButton).toBeEnabled();

  // Remove scoops from order
  const noVanilla = screen.getByRole("spinbutton", { name: "Vanilla" });
  await userEvent.clear(noVanilla);
  await userEvent.type(noVanilla, "0");
  const noChocolate = screen.getByRole("spinbutton", { name: "Chocolate" });
  await userEvent.clear(noChocolate);
  await userEvent.type(noChocolate, "0");

  const disabledOrderButton = screen.getByRole("button", { name: /order/i });
  expect(disabledOrderButton).toBeDisabled();
});
