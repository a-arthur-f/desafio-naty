import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoryHeader from "../../src/components/CategoryHeader";
import Icon from "../../src/components/Icon";
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
          <Button key="edit" variant="outlined">
            Editar
          </Button>,
          <Button key="delete" variant="outlined">
            Deletar
          </Button>,
        ]}
      />
    );

    expect(screen.getAllByRole("button")[0]).toHaveTextContent("Editar");
    expect(screen.getAllByRole("button")[1]).toHaveTextContent("Deletar");
  });
});
