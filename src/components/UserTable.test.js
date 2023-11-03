import Form from "./UserTable";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserTable from "./UserTable";
const throwError = () => {
  throw new Error("An error occured");
};
describe("form", () => {
  it("renders in the DOM", async () => {
    render(<UserTable />);
    expect(screen.getByTestId("userForm")).toBeInTheDocument();
  });

  it("shows a table of users", async () => {
    //TODO
    const { container } = render(<UserTable />);
    const rows = container.querySelectorAll("tbody tr");
    waitFor(() => {
      expect(rows).toHaveLength(10);
    });
  });

  it("does not allow you to submit if either input is empty", async () => {
    //TODO
    render(<UserTable />);
    const empty =
      screen.getByPlaceholderText(/First Name/i).empty &&
      screen.getByPlaceholderText(/User Name/i).empty;
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("adds a user to the table of users on submit", () => {
    //TODO
    render(<UserTable />);
    const button = screen.getByRole("button");
    const firstInput = screen.getByPlaceholderText(/First/i);
    const userInput = screen.getByPlaceholderText(/user/i);
    userEvent.click(firstInput);
    userEvent.keyboard("Uzoma");
    userEvent.click(userInput);
    userEvent.keyboard("wowo");
    userEvent.click(button);
    waitFor(async () => {
      const row = await screen.findByRole("row", { name: /wowo/i });
      expect(row).toBeInTheDocument();
    });
  });

  it("displays an error to the user", async () => {
    //TODO
    render(<UserTable />);
    expect(async () => {
      //const firstInput = screen.getByPlaceholderText(/First/i);
      //const userInput = screen.getByPlaceholderText(/user/i);
      // userEvent.click(firstInput);
      //userEvent.keyboard("");
      // userEvent.click(userInput);
      //userEvent.keyboard("");
      userEvent.click(screen.getByRole("button"));
      const error = await screen.findByTestId("errorMessage");
      expect(error).toBeInTheDocument();
    }).throwError;
  });

  it("displays the textinputs", () => {
    render(<UserTable />);
     const firstInput = screen.getByPlaceholderText(/First/i);
      const userInput = screen.getByPlaceholderText(/user/i);
      expect(firstInput).toBeInTheDocument()
      expect(userInput).toBeInTheDocument()
  });

  //TODO: add any tests to make sure the coverage threshold is met
});
