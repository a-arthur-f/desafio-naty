import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoryHeader from ".";
import Icon from "../Icon";
import { Button } from "@mui/material";

describe("teste do CategoryHeader", () => {
  test("titulo e icone", () => {
    render(
      <CategoryHeader
        title="Clientes"
        icon={<Icon name="client" />}
        action={[]}
      />
    );

    expect(screen.getByText("Clientes")).not.toBeNull();
    expect(screen.getByTestId("PersonIcon")).not.toBeNull();
  });

  test("ações", () => {
    render(
      <CategoryHeader
        title=""
        icon={<></>}
        action={[
          <Button variant="outlined">Editar</Button>,
          <Button variant="outlined">Deletar</Button>,
        ]}
      />
    );

    expect(screen.getAllByRole("button")[0]).toHaveTextContent("Editar");
    expect(screen.getAllByRole("button")[1]).toHaveTextContent("Deletar");
  });
});
