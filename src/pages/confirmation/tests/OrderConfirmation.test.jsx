import { screen, render } from "../../../test-utils/testing-library-utils";
import { server } from "../../../mocks/server";
import OrderConfirmation from "../OrderConfirmation";

import { rest } from "msw";

test("handles error for order confirmation route", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole("alert");
  expect(alert).toBeInTheDocument();
});
