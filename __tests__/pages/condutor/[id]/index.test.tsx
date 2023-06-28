import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import DriverDetails from "@/pages/condutor/[id]";

const data = [
  { name: "ID", value: "1" },
  { name: "Nº da habilitação", value: "123" },
  { name: "Categoria da habilitação", value: "A" },
  { name: "Nome", value: "Arthur" },
  { name: "Vencimento da habilitação", value: "28/01/2050" },
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
    render(<DriverDetails data={[]} />);

    const action = screen.getAllByRole("button");

    expect(screen.getByText("Detalhes do condutor"));
    expect(screen.getByTestId("AirlineSeatReclineExtraIcon"));
    expect(action[0]).toHaveTextContent("Editar");
    expect(action[0].parentElement).toHaveAttribute(
      "href",
      "/condutor/50/editar"
    );
    expect(action[1]).toHaveTextContent("Remover");
  });

  test("dados", () => {
    render(<DriverDetails data={data} />);

    expect(screen.getByText(/ID/).parentElement).toHaveTextContent("1");
    expect(
      screen.getByText(/Nº da habilitação/).parentElement
    ).toHaveTextContent("123");
    expect(
      screen.getByText(/Categoria da habilitação/).parentElement
    ).toHaveTextContent("A");
    expect(screen.getByText(/Nome/).parentElement).toHaveTextContent("Arthur");
    expect(
      screen.getByText(/Vencimento da habilitação/).parentElement
    ).toHaveTextContent("28/01/2050");
  });

  test("RemoveDialog cancelado", async () => {
    render(<DriverDetails data={[]} />);

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
