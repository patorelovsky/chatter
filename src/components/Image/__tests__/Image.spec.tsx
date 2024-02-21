import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Image from "../Image";
import mock from "./mock.jpg";

describe("Image", () => {
  it("should render image", () => {
    render(
      <Image image={{ id: 1, parentId: 1, parentType: "post", url: mock }} />
    );
    const imgEl = screen.getByRole("img");
    expect(imgEl).toBeInTheDocument();
  });
});
