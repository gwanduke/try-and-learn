import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UncontrolledFormat } from "./UncontrolledFormat";

describe("UncontrolledFormat", () => {
  test("adsf", async () => {
    render(<UncontrolledFormat />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.input(input, "1(112) 131 23");
    button.click();

    await screen.findByText("1(112) 131 23");
    screen.debug();
  });
});
