import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from ".";

describe("teste da home", () => {
  test("cards de categoria", () => {
    render(<Home />);
    expect(screen.getByText("Clientes").closest("a")).toHaveAttribute(
      "href",
      "/cliente"
    );
    expect(screen.getByText("Condutores").closest("a")).toHaveAttribute(
      "href",
      "/condutor"
    );
    expect(screen.getByText("Veículos").closest("a")).toHaveAttribute(
      "href",
      "/veiculo"
    );
    expect(screen.getByText("Deslocamentos").closest("a")).toHaveAttribute(
      "href",
      "/deslocamento"
    );
  });
});
