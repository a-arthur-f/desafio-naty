import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Driver from ".";
import { VehicleData } from "../../../types";

const data: VehicleData[] = [
  {
    id: 0,
    placa: "123",
    marcaModelo: "Fiat Uno",
    anoFabricacao: 0,
    kmAtual: 0,
  },

  {
    id: 2,
    placa: "456",
    marcaModelo: "Fiat Punto",
    anoFabricacao: 0,
    kmAtual: 0,
  },
];

describe("teste da pagina de veiculos", () => {
  test("header da categoria", () => {
    render(<Driver data={data} />);
    expect(screen.getByText("Veículos")).not.toBeNull();
  });

  test("lista de clientes", () => {
    render(<Driver data={data} />);
    expect(
      screen.getAllByText("Marca / Modelo:")[0].closest("p")
    ).toHaveTextContent("Fiat Uno");
    expect(screen.getAllByText("Placa:")[0].closest("p")).toHaveTextContent(
      "123"
    );
    expect(
      screen.getAllByText("Marca / Modelo:")[1].closest("p")
    ).toHaveTextContent("Fiat Punto");
    expect(screen.getAllByText("Placa:")[1].closest("p")).toHaveTextContent(
      "456"
    );
  });

  test("link de adicionar", () => {
    render(<Driver data={data} />);
    expect(screen.getByText("NOVO VEÍCULO").closest("a")).toHaveAttribute(
      "href",
      "/veiculo/novo"
    );
  });
});
