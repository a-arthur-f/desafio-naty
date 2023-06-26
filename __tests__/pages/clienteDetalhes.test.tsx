import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ClientDetails from "@/pages/cliente/[id]";

const data = [
  { name: "ID", value: "1" },
  { name: "Nº do documento", value: "123" },
  { name: "Tipo do documento", value: "CNH" },
  { name: "Nome", value: "Arthur" },
  { name: "Logradouro", value: "casa" },
  { name: "Número", value: "27" },
  { name: "Bairro", value: "Tijuca" },
  { name: "Cidade", value: "Rio de Janeiro" },
  { name: "UF", value: "RJ" },
];

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: { id: "50" },
    };
  },
}));

describe("teste da página de detalhes do cliente", () => {
  test("header da categoria", () => {
    render(<ClientDetails data={[]} />);

    const action = screen.getAllByRole("button");

    expect(screen.getByText("Detalhes do cliente")).not.toBeNull();
    expect(screen.getByTestId("PersonIcon")).not.toBeNull();
    expect(action[0]).toHaveTextContent("Editar");
    expect(action[0].parentElement).toHaveAttribute(
      "href",
      "/cliente/50/editar"
    );
    expect(action[1]).toHaveTextContent("Remover");
  });

  test("dados", () => {
    render(<ClientDetails data={data} />);

    expect(screen.getByText(/ID/).parentElement).toHaveTextContent("1");
    expect(screen.getByText(/Nº do documento/).parentElement).toHaveTextContent(
      "123"
    );
    expect(
      screen.getByText(/Tipo do documento/).parentElement
    ).toHaveTextContent("CNH");
    expect(screen.getByText(/Nome/).parentElement).toHaveTextContent("Arthur");
    expect(screen.getByText(/Logradouro/).parentElement).toHaveTextContent(
      "casa"
    );
    expect(screen.getByText(/Número/).parentElement).toHaveTextContent("27");
    expect(screen.getByText(/Bairro/).parentElement).toHaveTextContent(
      "Tijuca"
    );
    expect(screen.getByText(/Cidade/).parentElement).toHaveTextContent(
      "Rio de Janeiro"
    );
    expect(screen.getByText(/UF/).parentElement).toHaveTextContent("RJ");
  });

  test("RemoveDialog cancelado", async () => {
    render(<ClientDetails data={[]} />);

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
