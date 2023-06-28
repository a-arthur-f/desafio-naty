import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import VehicleDetails from "@/pages/veiculo/[id]";

const data = [
  { name: "ID", value: "1" },
  { name: "Placa", value: "123" },
  { name: "Marca / Modelo", value: "Fiat uno" },
  { name: "Ano de fabricação", value: "2000" },
  { name: "Km atual", value: "1000" },
];

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: { id: "50" },
    };
  },
}));

describe("teste da página de detalhes do condutor", () => {
  test("header da categoria", () => {
    render(<VehicleDetails data={[]} />);

    const action = screen.getAllByRole("button");

    expect(screen.getByText("Detalhes do veículo"));
    expect(screen.getByTestId("DriveEtaIcon"));
    expect(action[0]).toHaveTextContent("Editar");
    expect(action[0].parentElement).toHaveAttribute(
      "href",
      "/veiculo/50/editar"
    );
    expect(action[1]).toHaveTextContent("Remover");
  });

  test("dados", () => {
    render(<VehicleDetails data={data} />);

    expect(screen.getByText(/ID/).parentElement).toHaveTextContent("1");
    expect(screen.getByText(/Placa/).parentElement).toHaveTextContent("123");
    expect(screen.getByText(/Marca \/ Modelo/).parentElement).toHaveTextContent(
      "Fiat uno"
    );
    expect(
      screen.getByText(/Ano de fabricação/).parentElement
    ).toHaveTextContent("2000");
    expect(screen.getByText(/Km atual/).parentElement).toHaveTextContent(
      "1000"
    );
  });

  test("RemoveDialog cancelado", async () => {
    render(<VehicleDetails data={[]} />);

    const removeButton = screen.getByText("Remover");

    fireEvent.click(removeButton);

    expect(await screen.findByText("Deseja realmente remover?"));

    const cancelButton = screen.getByText("NÃO");

    fireEvent.click(cancelButton);

    expect(
      await waitForElementToBeRemoved(() =>
        screen.queryByText("Deseja realmente remover?")
      )
    );
  });
});
