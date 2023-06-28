import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Driver from "../../../src/pages/deslocamento";

const data = [
  {
    id: 0,
    nomeCondutor: "aaa",
    nomeCliente: "Arthur",
  },

  {
    id: 2,
    nomeCondutor: "bbb",
    nomeCliente: "João",
  },
];

describe("teste da pagina de deslocamentos", () => {
  test("header da categoria", () => {
    render(<Driver data={data} />);
    expect(screen.getByText("Deslocamentos")).not.toBeNull();
  });

  test("lista de deslocamentos", () => {
    render(<Driver data={data} />);
    expect(screen.getAllByText("Cliente:")[0].closest("p")).toHaveTextContent(
      "Arthur"
    );
    expect(screen.getAllByText("Condutor:")[0].closest("p")).toHaveTextContent(
      "aaa"
    );
    expect(screen.getAllByText("Cliente:")[1].closest("p")).toHaveTextContent(
      "João"
    );
    expect(screen.getAllByText("Condutor:")[1].closest("p")).toHaveTextContent(
      "bbb"
    );
  });

  test("link de adicionar", () => {
    render(<Driver data={data} />);
    expect(screen.getByText("NOVO DESLOCAMENTO").closest("a")).toHaveAttribute(
      "href",
      "/deslocamento/novo"
    );
  });
});
