import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Details from "@/components/Details";

const data = [
  { name: "Nº do documento", value: "123" },
  { name: "Tipo do documento", value: "cnh" },
  { name: "Nome", value: "Arthur" },
];

describe("teste do Details", () => {
  test("dados", () => {
    render(<Details data={data} />);

    expect(screen.getByText(/Nº do documento/).closest("p")).toHaveTextContent(
      "123"
    );
    expect(
      screen.getByText(/Tipo do documento/).closest("p")
    ).toHaveTextContent("cnh");
    expect(screen.getByText(/Nome/).closest("p")).toHaveTextContent("Arthur");
  });
});
