import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import DisplacementDetails from "@/pages/deslocamento/[id]";

const data = [
  { name: "ID", value: "1" },
  { name: "Km inicial", value: "12" },
  { name: "Km final", value: "20" },
  { name: "Ínicio do deslocamento", value: "12/07/2023" },
  { name: "Fim do deslocamento", value: "12/07/2023" },
  { name: "Checklist", value: "..." },
  { name: "Observação", value: "..." },
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
    render(<DisplacementDetails data={[]} />);

    const action = screen.getAllByRole("button");

    expect(screen.getByText("Detalhes do deslocamento"));
    expect(screen.getByTestId("TrendingUpIcon"));
    expect(action[0]).toHaveTextContent("Editar");
    expect(action[0].parentElement).toHaveAttribute(
      "href",
      "/deslocamento/50/editar"
    );
    expect(action[1]).toHaveTextContent("Remover");
  });

  test("dados", () => {
    render(<DisplacementDetails data={data} />);

    expect(screen.getByText(/ID/).parentElement).toHaveTextContent("1");
    expect(screen.getByText(/Km inicial/).parentElement).toHaveTextContent(
      "12"
    );
    expect(screen.getByText(/Km final/).parentElement).toHaveTextContent("20");
    expect(
      screen.getByText(/Ínicio do deslocamento/).parentElement
    ).toHaveTextContent("12/07/2023");
    expect(
      screen.getByText(/Fim do deslocamento/).parentElement
    ).toHaveTextContent("12/07/2023");
    expect(screen.getByText(/Checklist/).parentElement).toHaveTextContent(
      "..."
    );
    expect(screen.getByText(/Observação/).parentElement).toHaveTextContent(
      "..."
    );
  });

  test("RemoveDialog cancelado", async () => {
    render(<DisplacementDetails data={[]} />);

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
