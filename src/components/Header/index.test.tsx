import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from ".";

describe("Testes do header", () => {
  test("logo", () => {
    render(<Header />);
    expect(screen.getByAltText("logo da secretária naty"));
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
