import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ScoopOption from "../ScoopOption";

describe("Scoop input box turns red when input is invalid", () => {
  test("Input box turns red when scoop count is negative", async () => {
    render(
      <ScoopOption
        updateItemCount={jest.fn()}
        name="Vanilla"
        imagePath="/images/vanilla.png"
      />
    );

    const scoopInput = screen.getByRole("spinbutton", { name: "Vanilla" });
    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, "-1");
    const invalidScoopInput = screen.getByRole("spinbutton", {
      name: "Vanilla",
    });
    await waitFor(() => expect(invalidScoopInput).toHaveClass("is-invalid"));
  });

  test("Input box turns red when scoop count is decimal", async () => {
    render(
      <ScoopOption
        updateItemCount={jest.fn()}
        name="Vanilla"
        imagePath="/images/vanilla.png"
      />
    );

    const scoopInput = screen.getByRole("spinbutton", { name: "Vanilla" });
    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, "0.5");
    const invalidScoopInput = screen.getByRole("spinbutton", {
      name: "Vanilla",
    });
    await waitFor(() => expect(invalidScoopInput).toHaveClass("is-invalid"));
  });

  test("Input box turns red when scoop count is greater than 10", async () => {
    render(
      <ScoopOption
        updateItemCount={jest.fn()}
        name="Vanilla"
        imagePath="/images/vanilla.png"
      />
    );

    const scoopInput = screen.getByRole("spinbutton", { name: "Vanilla" });
    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, "11");
    const invalidScoopInput = screen.getByRole("spinbutton", {
      name: "Vanilla",
    });
    await waitFor(() => expect(invalidScoopInput).toHaveClass("is-invalid"));
  });

  test("Input box doesn't turn red if input is valid", async () => {
    render(
      <ScoopOption
        updateItemCount={jest.fn()}
        name="Vanilla"
        imagePath="/images/vanilla.png"
      />
    );

    const scoopInput = screen.getByRole("spinbutton", { name: "Vanilla" });
    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, "3");
    const validScoopInput = screen.getByRole("spinbutton", { name: "Vanilla" });
    await waitFor(() => expect(validScoopInput).not.toHaveClass("is-invalid"));
  });

  test("Input box red border is removed when input becomes valid", async () => {
    render(
      <ScoopOption
        updateItemCount={jest.fn()}
        name="Vanilla"
        imagePath="/images/vanilla.png"
      />
    );

    const scoopInput = screen.getByRole("spinbutton", { name: "Vanilla" });
    // Input invalid scoop count
    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, "11");
    // change scoop count to a valid input
    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, "2");
    await waitFor(() => expect(scoopInput).not.toHaveClass("is-invalid"));
  });
});
