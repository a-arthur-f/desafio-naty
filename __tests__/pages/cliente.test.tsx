import { screen, render, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import Client from "../../src/pages/cliente";
import { ClientData } from "../../types";

const data: ClientData[] = [
  {
    id: 0,
    numeroDocumento: "123",
    tipoDocumento: "CNH",
    nome: "Arthur",
    bairro: "senador camará",
    cidade: "rio de janeiro",
    uf: "rj",
    logradouro: "...",
    numero: "27",
  },

  {
    id: 2,
    numeroDocumento: "456",
    tipoDocumento: "CNH",
    nome: "João",
    bairro: "senador camará",
    cidade: "rio de janeiro",
    uf: "rj",
    logradouro: "...",
    numero: "27",
  },
];

describe("teste da pagina de clientes", () => {
  test("header da categoria", () => {
    render(<Client data={data} />);
    expect(screen.getByText("Clientes")).not.toBeNull();
  });

  test("lista de clientes", () => {
    render(<Client data={data} />);
    expect(screen.getAllByText("Nome:")[0].closest("p")).toHaveTextContent(
      "Arthur"
    );
    expect(
      screen.getAllByText("Nº do documento:")[0].closest("p")
    ).toHaveTextContent("123");
    expect(screen.getAllByText("Nome:")[1].closest("p")).toHaveTextContent(
      "João"
    );
    expect(
      screen.getAllByText("Nº do documento:")[1].closest("p")
    ).toHaveTextContent("456");
  });

  test("link de adicionar", () => {
    render(<Client data={data} />);
    expect(screen.getByText("NOVO CLIENTE").closest("a")).toHaveAttribute(
      "href",
      "/cliente/novo"
    );
  });
});
