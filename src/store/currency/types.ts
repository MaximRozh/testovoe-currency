import CurrencyModel from "../../models/Currency.model";

export interface CurrencyState {
  currencies: CurrencyModel[];
  selectedCur: string;
  currenciesCode: string[];
}

export enum CurrencyActionEnum {
  GET_CURRENCY = "GET_CURRENCY",
  SELECT_CURRENCY = "SELECT_CURRENCY",
  SET_CURRENCY_CODE = "SET_CURRENCY_CODE",
}

export interface GetCurrencyAction {
  type: CurrencyActionEnum.GET_CURRENCY;
  payload: CurrencyModel[];
}

export interface SelectCurrencyAction {
  type: CurrencyActionEnum.SELECT_CURRENCY;
  payload: string;
}

export interface SetCurrenciesCodeAction {
  type: CurrencyActionEnum.SET_CURRENCY_CODE;
  payload: string[];
}

export type CurrencyAction =
  | GetCurrencyAction
  | SelectCurrencyAction
  | SetCurrenciesCodeAction;
