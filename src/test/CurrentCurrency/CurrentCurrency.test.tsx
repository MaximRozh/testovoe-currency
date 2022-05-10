import React from "react";
import { cleanup, RenderResult } from "@testing-library/react";
import { store } from "../../store";
import { CurrencyActionCreator } from "../../store/currency/action";
import { act } from "react-dom/test-utils";
import { toFixed } from "../../helpers";
import {
  currencies,
  ExchangeCurrency,
  getRatesFromCurrencies,
} from "../testUtils";
import { renderWithProviders } from "../renderWithProvider";
import CurrentCurrency from "../../pages/CurrentCurrency";

jest.useFakeTimers("modern");
let div: RenderResult;

describe("Check Current Rates", () => {
  beforeEach(() => {
    div = renderWithProviders(<CurrentCurrency />);
    act(() => {
      store.dispatch(CurrencyActionCreator.setCurencies(currencies));
    });
  });
  afterEach(cleanup);

  it("All rates are displayed", () => {
    const retes = div.container.querySelectorAll(".rate-item");
    expect(retes.length).toBe(currencies.length);
  });
  it("If select USD - change rates to UAH", () => {
    act(() => {
      store.dispatch(CurrencyActionCreator.selectCurrency("USD"));
    });
    const retes = div.container.querySelectorAll(".rate-item");

    const { USD } = getRatesFromCurrencies([ExchangeCurrency.USD], currencies);

    const changedCurrencyCode = retes[0].firstElementChild?.innerHTML.replace(
      " :",
      ""
    );
    const changedRate = retes[0].lastChild?.textContent;

    expect(changedCurrencyCode).toBe("UAH");
    expect(changedRate).toBe(toFixed(1 / USD).toString());
  });
});

describe("CurrentCurrency snapshot", () => {
  it("Make CurrentCurrency snapshot", () => {
    const div = renderWithProviders(<CurrentCurrency />);
    const { asFragment } = div;
    expect(asFragment()).toMatchSnapshot();
  });
});
