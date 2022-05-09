import CurrencyModel from "../models/Currency.model";

export const BASE_CURRENCY = "UAH";
export const BTC_CURRENCY = "BTC";

interface SplitedText {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}
export const splitedText = (str: string): SplitedText => {
  ///[in]/ig use regEx
  const splited = str.split(" ").filter((item) => item !== "in");
  return {
    amount: +splited[0],
    fromCurrency: splited[1],
    toCurrency: splited[2],
  };
};

export const checkInputText = (
  fromCurrency: string,
  toCurrency: string,
  amount: number
): boolean => {
  const isNotEmpty = fromCurrency && toCurrency && amount;
  const isNotEqual = fromCurrency !== toCurrency;
  const hasCurrencyCode =
    fromCurrency?.length === 3 && toCurrency?.length === 3;
  return amount > 0 && Boolean(isNotEmpty) && isNotEqual && hasCurrencyCode;
};

export const isHaveCurrencyInArray = (
  values: string,
  arr: CurrencyModel[]
): boolean => {
  return arr.some((item) => item.ccy === values?.toUpperCase());
};

export const getCurrencyIndex = (arr: any[], value: string): number =>
  arr.findIndex((item) => item.ccy === value?.toUpperCase());

export const isUah = (val: string): boolean =>
  val?.toUpperCase() === BASE_CURRENCY;

export const isBtc = (val: string): boolean =>
  val?.toUpperCase() === BTC_CURRENCY;

export const toFixed = (val: number): number => Number(val.toFixed(3));

export const validation = (
  fromCurrency: string,
  toCurrency: string,
  amount: number,
  currencies: CurrencyModel[]
) => {
  const isValid = checkInputText(fromCurrency, toCurrency, amount);
  const validCurrencyFrom = isHaveCurrencyInArray(fromCurrency, currencies);
  const validCurrencyTo = isHaveCurrencyInArray(toCurrency, currencies);
  return (
    !isValid ||
    !(
      (validCurrencyFrom || isUah(fromCurrency)) &&
      (validCurrencyTo || isUah(toCurrency))
    )
  );
};
