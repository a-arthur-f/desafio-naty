import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataList from ".";
import Icon from "../Icon";

const data = [
  {
    id: 0,
    info1: { name: "Nº da habilitação", value: "1234" },
    info2: { name: "Nome", value: "Arthur" },
  },
  {
    id: 2,
    info1: { name: "Nº da habilitação", value: "5678" },
    info2: { name: "Nome", value: "João" },
  },
];

describe("teste do DataList", () => {
  test("items", () => {
    render(
      <DataList items={data} icon={<Icon name="client" />} link="cliente" />
    );

    expect(
      screen.getAllByText("Nº da habilitação:")[0].closest("p")
    ).toHaveTextContent("1234");
    expect(screen.getAllByText("Nome:")[0].closest("p")).toHaveTextContent(
      "Arthur"
    );
    expect(
      screen.getAllByText("Nº da habilitação:")[1].closest("p")
    ).toHaveTextContent("5678");
    expect(screen.getAllByText("Nome:")[1].closest("p")).toHaveTextContent(
      "João"
    );
  });
});
