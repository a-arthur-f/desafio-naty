import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Driver from "../../../src/pages/condutor";
import { DriverData } from "../../../src/types";

const data: DriverData[] = [
  {
    id: 0,
    numeroHabilitacao: "123",
    nome: "Arthur",
    catergoriaHabilitacao: "a",
    vencimentoHabilitacao: "0000",
  },

  {
    id: 2,
    numeroHabilitacao: "456",
    nome: "João",
    catergoriaHabilitacao: "b",
    vencimentoHabilitacao: "0000",
  },
];

describe("teste da pagina de condutores", () => {
  test("header da categoria", () => {
    render(<Driver data={data} />);
    expect(screen.getByText("Condutores")).not.toBeNull();
  });

  test("lista de clientes", () => {
    render(<Driver data={data} />);
    expect(screen.getAllByText("Nome:")[0].closest("p")).toHaveTextContent(
      "Arthur"
    );
    expect(
      screen.getAllByText("Nº da habilitação:")[0].closest("p")
    ).toHaveTextContent("123");
    expect(screen.getAllByText("Nome:")[1].closest("p")).toHaveTextContent(
      "João"
    );
    expect(
      screen.getAllByText("Nº da habilitação:")[1].closest("p")
    ).toHaveTextContent("456");
  });

  test("link de adicionar", () => {
    render(<Driver data={data} />);
    expect(screen.getByText("NOVO CONDUTOR").closest("a")).toHaveAttribute(
      "href",
      "/condutor/novo"
    );
  });
});
