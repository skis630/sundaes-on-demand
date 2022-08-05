import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  //   make sure subtotal starts out $0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  //   check cherries and validate subtotal
  const cherriesToppingInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await userEvent.click(cherriesToppingInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  //   check Hot fudge and validate subtotal
  const hotFudgeToppingInput = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await userEvent.click(hotFudgeToppingInput);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  //   un-check cherries and validate subtotal
  await userEvent.click(cherriesToppingInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("Check that grand total updates properly", () => {
  //   render(<OrderEntry />);
  //   const grandTotal = screen.getByRole("heading", {
  //     name: /grand total: \$/i,
  //   });
  test("grand total starts out $0.00", () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
  });

  test("add scoops first then toppings updates grand total", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
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

    // add toppings
    const cherries = await screen.findByRole("checkbox", { name: "Cherries" });
    await userEvent.click(cherries);
    const hotFudge = screen.getByRole("checkbox", { name: "Hot fudge" });
    await userEvent.click(hotFudge);

    expect(grandTotal).toHaveTextContent("7.00");
  });

  test("add toppings first then scoops updates grand total", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    // add toppings
    const cherries = await screen.findByRole("checkbox", { name: "Cherries" });
    await userEvent.click(cherries);
    const hotFudge = await screen.findByRole("checkbox", { name: "Hot fudge" });
    await userEvent.click(hotFudge);

    //   add 1 scoop of vanilla and 1 scoop of chocolate
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "1");
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await userEvent.clear(chocolateInput);
    await userEvent.type(chocolateInput, "1");

    expect(grandTotal).toHaveTextContent("7.00");
  });

  test("grand total updates correctly when an item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    // add toppings
    const cherries = await screen.findByRole("checkbox", { name: "Cherries" });
    await userEvent.click(cherries);
    const hotFudge = await screen.findByRole("checkbox", { name: "Hot fudge" });
    await userEvent.click(hotFudge);

    //   add 1 scoop of vanilla and 1 scoop of chocolate
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "1");
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await userEvent.clear(chocolateInput);
    await userEvent.type(chocolateInput, "1");

    // remove cherries
    await userEvent.click(cherries);
    // remove chocolate scoop
    await userEvent.type(chocolateInput, "0");

    expect(grandTotal).toHaveTextContent("3.50");
  });
});
