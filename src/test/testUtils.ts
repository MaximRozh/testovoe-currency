import React from "react";
import CurrencyModel from "../models/Currency.model";

export const currencies: CurrencyModel[] = [
  {
    buy: 29.2549,
    ccy: "USD",
  },
  {
    buy: 30.2549,
    ccy: "EUR",
  },
  {
    buy: 0.32,
    ccy: "RUR",
  },
  {
    buy: 30211.4229,
    ccy: "BTC",
  },
];

export const getRatesFromCurrencies = (values: string[], arr: any[]) =>
  values.reduce((acc: { [key: string]: number }, next: string) => {
    const findItem: number = arr.find(
      (item) => item.ccy === next.toUpperCase()
    ).buy;
    return { ...acc, [next.toUpperCase()]: findItem };
  }, {});

export enum ExchangeCurrency {
  UAH = "uah",
  USD = "usd",
  EUR = "eur",
  BTC = "btc",
}
