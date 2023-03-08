import { SelectField } from "@/components/SelectField";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const options = [
  { label: "option 1", value: "option1" },
  { label: "option 2", value: "option2" },
  { label: "option 3", value: "option3" },
];
const placeholder = `select an option`;

describe("SelectField", () => {
  it("renders without errors", () => {
    render(
      <SelectField
        placeholder={placeholder}
        options={options}
        value=""
        onChange={() => {}}
      />
    );

    const selectBtn = screen.getByTestId("select-btn");
    expect(selectBtn).toHaveTextContent(placeholder);
    fireEvent.click(selectBtn);

    // test all the options are rendered
    options.forEach((opt) => {
      const option = screen.getByText(opt.label);
      expect(option).toBeInTheDocument();
    });
  });

  it("calls on change callback when an option is selected", () => {
    const fn = jest.fn();
    render(
      <SelectField
        placeholder={placeholder}
        options={options}
        value=""
        onChange={fn}
      />
    );

    const selectBtn = screen.getByTestId("select-btn");
    expect(selectBtn).toHaveTextContent(placeholder);
    fireEvent.click(selectBtn);

    const firstOption = options[0];
    fireEvent.click(screen.getByText(firstOption.label));
    expect(fn).toBeCalled();
  });
});
