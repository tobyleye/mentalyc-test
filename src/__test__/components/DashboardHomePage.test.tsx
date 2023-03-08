import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardHomePage from "../../components/DashboardHomePage";

global.ResizeObserver = require("resize-observer-polyfill");

const randomFn = jest.spyOn(global.Math, "random").mockReturnValue(1);

beforeEach(() => {
  render(<DashboardHomePage />);
});

afterAll(() => {
  jest.clearAllMocks();
});

type Note = {
  noteType: RegExp;
  clientName: string;
};

const uploadNote = async (note: Note) => {
  const uploadBtn = screen.getByTestId("upload");
  fireEvent.click(uploadBtn);
  const uploadDialog = screen.getByRole("dialog");
  expect(uploadDialog).toBeInTheDocument();
  // submit button should be disabled by default
  const submitBtn = screen.getByText(/finish upload/i);
  expect(submitBtn).toBeDisabled();

  // select an option from the listbox
  fireEvent.click(screen.getByText(/Select note type/i));
  // listbox opens
  expect(screen.getByRole("listbox")).toBeInTheDocument();
  // select first option
  fireEvent.click(screen.getByText(note.noteType));

  fireEvent.change(screen.getByPlaceholderText(/Enter client name/i), {
    target: {
      value: note.clientName,
    },
  });
  // submit button is enabled now
  expect(submitBtn).toBeEnabled();
  fireEvent.click(submitBtn);

  expect(randomFn).toBeCalled();

  // dialog is closed
  expect(uploadDialog).not.toBeInTheDocument();
};

describe("Recording session upload", () => {
  const note = {
    noteType: /progress note/i,
    clientName: `John bellion`,
  };

  it("adds new recording session", async () => {
    await uploadNote(note);
    // we expect to find new note in the list
    expect(screen.getByText(note.noteType)).toBeInTheDocument();
    expect(screen.getByText(note.clientName)).toBeInTheDocument();
  });

  it("removes a recording session when its delete button is clicked", async () => {
    await uploadNote(note);

    waitFor(() => {
      const uploadBtn = screen.getByTestId("upload");
      fireEvent.click(uploadBtn);
      fireEvent.click(screen.getByTestId(`note-delete-button-0`));

      // expects to see confirmation dialog
      expect(screen.getByText(/Are you sure?/i));
      fireEvent.click(screen.getByTestId(`note-delete-button-0-yes`));

      expect(screen.queryByText(note.noteType)).not.toBeInTheDocument();
      expect(screen.queryByText(note.clientName)).not.toBeInTheDocument();
    });
  });
});
