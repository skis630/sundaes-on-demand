import { render, screen, fireEvent } from "@testing-library/react";
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

test("Checking checkbox enables confirm button and vice versa", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to the Terms and Conditions",
  });
  const button = screen.getByRole("button", { name: "Confirm order" });

  // checking checkbox enables button
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

  // unchecking checkbox disables button
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
