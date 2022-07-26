import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("Initial conditions", () => {
  render(<SummaryForm />);

  // checkbox is unchecked
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to the Terms and Conditions",
  });
  expect(checkbox).not.toBeChecked();
  //   button is disabled
  const button = screen.getByRole("button", "Confirm order");
  expect(button).toBeDisabled();
});

test("Checking checkbox enables confirm button and vice versa", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to the Terms and Conditions",
  });
  const button = screen.getByRole("button", { name: "Confirm order" });

  // checking checkbox enables button
  await user.click(checkbox);
  expect(button).toBeEnabled();

  // unchecking checkbox disables button
  await user.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  // set up userEvent
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  const overlay = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(overlay).not.toBeInTheDocument();
});
