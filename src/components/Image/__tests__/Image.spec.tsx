import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Image from "../Image";
import mock from "./mock.jpg";

describe("Image", () => {
  const closeModal = (HTMLDialogElement.prototype.close = jest.fn());
  const showModal = (HTMLDialogElement.prototype.showModal = jest.fn());

  it("should render image", () => {
    render(
      <Image image={{ id: 1, parentId: 1, parentType: "post", url: mock }} />
    );
    const imgEl = screen.getByRole("img");
    expect(imgEl).toBeInTheDocument();
  });

  it("should show image in the modal dialog on click", () => {
    render(
      <Image image={{ id: 1, parentId: 1, parentType: "post", url: mock }} />
    );
    const imgEl = screen.getByRole("img");
    const dialog: HTMLDialogElement = screen.getByTestId("dialog");

    showModal.mockImplementationOnce(() => (dialog.open = true));

    fireEvent.click(imgEl);
    expect(dialog).toBeVisible();
  });

  it("should close modal dialog on click", () => {
    render(
      <Image image={{ id: 1, parentId: 1, parentType: "post", url: mock }} />
    );
    const imgEl = screen.getByRole("img");
    const dialog: HTMLDialogElement = screen.getByTestId("dialog");

    showModal.mockImplementationOnce(() => (dialog.open = true));
    fireEvent.click(imgEl);

    closeModal.mockImplementationOnce(() => (dialog.open = false));
    fireEvent.click(dialog);

    expect(dialog).not.toBeVisible();
  });
});
