import { screen, render } from "@testing-library/react";
import Icon from "../../src/components/Icon";

describe("teste do Icon", () => {
  test("icone de cliente", () => {
    render(<Icon name="client" />);
    expect(screen.getByTestId("PersonIcon")).not.toBeNull();
  });
  test("icone de condutor", () => {
    render(<Icon name="driver" />);
    expect(screen.getByTestId("AirlineSeatReclineExtraIcon")).not.toBeNull();
  });
  test("icone de veiculo", () => {
    render(<Icon name="vehicle" />);
    expect(screen.getByTestId("DriveEtaIcon")).not.toBeNull();
  });
  test("icone de deslocamento", () => {
    render(<Icon name="displacement" />);
    expect(screen.getByTestId("TrendingUpIcon")).not.toBeNull();
  });
});
