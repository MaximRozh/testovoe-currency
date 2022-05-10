import React from "react";
import { cleanup, fireEvent, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConvertCurrency from "../../pages/ConvertCurrency";
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

jest.useFakeTimers("modern");
let div: RenderResult;
let result: HTMLSpanElement;
let input: HTMLInputElement;

const amount = 15;

describe("check calculation", () => {
  beforeEach(() => {
    div = renderWithProviders(<ConvertCurrency />);
    act(() => {
      store.dispatch(CurrencyActionCreator.setCurencies(currencies));
    });
    result = div.container.querySelector(
      ".convert-result-text"
    ) as HTMLSpanElement;
    input = div.container.querySelector(
      "input[name=conver]"
    ) as HTMLInputElement;
  });
  afterEach(cleanup);

  it("Convert To UAH", () => {
    userEvent.type(
      input,
      `${amount} ${ExchangeCurrency.USD} in ${ExchangeCurrency.UAH}`
    );
    act(() => {
      jest.runAllTimers();
    });
    const { USD } = getRatesFromCurrencies([ExchangeCurrency.USD], currencies);

    const calc = toFixed(USD * amount);

    const resultValue: string = result?.innerHTML || "";

    expect(parseFloat(resultValue)).toBe(calc);
  });
  it("Convert From UAH", () => {
    userEvent.type(
      input,
      `${amount} ${ExchangeCurrency.UAH} in ${ExchangeCurrency.USD}`
    );
    act(() => {
      jest.runAllTimers();
    });
    const { USD } = getRatesFromCurrencies([ExchangeCurrency.USD], currencies);

    const calc = toFixed(amount / USD);

    const resultValue: string = result?.innerHTML || "";

    expect(parseFloat(resultValue)).toBe(calc);
  });
  it("Convert From BTC", () => {
    userEvent.type(
      input,
      `${amount} ${ExchangeCurrency.BTC} in ${ExchangeCurrency.EUR}`
    );
    act(() => {
      jest.runAllTimers();
    });

    const { USD, BTC, EUR } = getRatesFromCurrencies(
      [ExchangeCurrency.USD, ExchangeCurrency.BTC, ExchangeCurrency.EUR],
      currencies
    );

    const calc = toFixed(((BTC * USD) / EUR) * amount);

    const resultValue: string = result?.innerHTML || "";

    expect(parseFloat(resultValue)).toBe(calc);
  });
  it("Convert To BTC", () => {
    const amountForBTC = amount * 1000;

    userEvent.type(
      input,
      `${amountForBTC} ${ExchangeCurrency.EUR} in ${ExchangeCurrency.BTC}`
    );
    act(() => {
      jest.runAllTimers();
    });

    const { USD, BTC, EUR } = getRatesFromCurrencies(
      [ExchangeCurrency.USD, ExchangeCurrency.BTC, ExchangeCurrency.EUR],
      currencies
    );

    const calc = toFixed((EUR / USD / BTC) * amountForBTC);

    const resultValue: string = result?.innerHTML || "";

    expect(parseFloat(resultValue)).toBe(calc);
  });
  it("Has error", () => {
    userEvent.type(input, `${amount} WRONG_VALUE in ${ExchangeCurrency.BTC}`);
    act(() => {
      jest.runAllTimers();
    });
    fireEvent.focusOut(input);
    const errorText = div?.container.querySelector(".error-text");

    expect(errorText).toBeInTheDocument();
  });
});

describe("ConvertCurrency snapshot", () => {
  it("Make ConvertCurrency snapshot", () => {
    const div = renderWithProviders(<ConvertCurrency />);
    const { asFragment } = div;
    expect(asFragment()).toMatchSnapshot();
  });
});
