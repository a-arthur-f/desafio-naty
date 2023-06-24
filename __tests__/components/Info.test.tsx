import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Info from "@/components/Info";

describe("teste do Info", () => {
  test("informação", () => {
    render(<Info name="Nº do documento" value="123" />);

    expect(screen.getByText("Nº do documento:").closest("p")).toHaveTextContent(
      "123"
    );
  });
});
