import { screen, render } from "@testing-library/react";
import CategoryCard from ".";
import PersonIcon from "@mui/icons-material/Person";

describe("teste do CategoryCard", () => {
  test("nome da categoria", () => {
    render(<CategoryCard categoryName="Cliente" icon={<></>} />);
    expect(screen.getByText("Cliente")).not.toBeNull();
  });

  test("icone da categoria", () => {
    render(
      <CategoryCard
        categoryName="Cliente"
        icon={<PersonIcon titleAccess="icone de cliente" />}
      />
    );
    expect(screen.getByTestId("PersonIcon")).not.toBeNull();
  });
});
