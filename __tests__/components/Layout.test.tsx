import { render, screen } from "@testing-library/react";
import Layout from "../../src/components/Layout";

describe("teste do layout", () => {
  test("header", () => {
    render(
      <Layout>
        <></>
      </Layout>
    );
    expect(screen.getByAltText("logo da secretária naty"));
  });
});
