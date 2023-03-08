import { SelectField } from "@/components/SelectField";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UploadModal } from "@/components/UploadModal";

describe("Upload Modal", () => {
  it("renders without errors", async () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    render(
      <UploadModal open={true} onClose={handleClose} onSubmit={handleSubmit} />
    );
    waitFor(() => {
      expect(screen.getByText(/Complete Your Upload/)).toBeInTheDocument();
      expect(
        screen.getByText(/Fill in the details below to complete your upload/)
      ).toBeInTheDocument();

      // show a listbox input to select not type
      const listboxTrigger = screen.getByText(/select note type/i);
      expect(listboxTrigger).toBeInTheDocument();

      // shows an an input to enter client's name
      expect(
        screen.getByPlaceholderText(/Enter client name/i)
      ).toBeInTheDocument();

      // submit button should be disabled until the input fields are filled
      const submitBtn = screen.getByText(/Finish Upload/);
      expect(submitBtn).toBeDisabled();
    });
  });
});
