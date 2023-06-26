import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import RemoveDialog from "@/components/RemoveDialog";

const title = "Deseja realmente remover?";

describe("teste do RemoveDialog", () => {
  test("Dialog feachado", () => {
    render(<RemoveDialog open={false} action={() => {}} onClose={() => {}} />);

    expect(screen.queryByText(title)).toBeNull();
  });

  test("Dialog aberto", () => {
    render(<RemoveDialog open={true} action={() => {}} onClose={() => {}} />);

    const action = screen.getAllByRole("button");

    expect(screen.getByText(title));
    expect(action[0]).toHaveTextContent("SIM");
    expect(action[1]).toHaveTextContent("NÃO");
  });
});
