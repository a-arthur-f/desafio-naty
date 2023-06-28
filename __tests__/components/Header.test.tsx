import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../src/components/Header";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathName: "/",
      back() {},
    };
  },
}));

describe("Testes do header", () => {
  test("logo", () => {
    render(<Header />);
    expect(screen.getByAltText("logo da secretária naty"));
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });

  test("BackButton", () => {
    render(<Header />);
    expect(screen.getByTestId("ArrowBackIosIcon"));
  });
});
