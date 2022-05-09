import {
  CurrencyActionEnum,
  GetCurrencyAction,
  SelectCurrencyAction,
  SetCurrenciesCodeAction,
} from "./types";

import CurrencyModel from "../../models/Currency.model";
import { AppDispatch } from "..";
import CurrencyService from "../../services/currencyService";

export const CurrencyActionCreator = {
  setCurencies: (data: CurrencyModel[]): GetCurrencyAction => ({
    type: CurrencyActionEnum.GET_CURRENCY,
    payload: data,
  }),
  setCurrenciesCode: (data: string[]): SetCurrenciesCodeAction => ({
    type: CurrencyActionEnum.SET_CURRENCY_CODE,
    payload: data,
  }),
  //try to fix ANY
  getCurencies:
    (): any =>
    (dispatch: AppDispatch): void => {
      CurrencyService.getCurrency().then((res) => {
        dispatch(CurrencyActionCreator.setCurencies(res));

        const currenciesCode = res.map((item: CurrencyModel) => item.ccy);
        dispatch(
          CurrencyActionCreator.setCurrenciesCode(["UAH", ...currenciesCode])
        );
      });
    },
  selectCurrency: (currency: string): SelectCurrencyAction => ({
    type: CurrencyActionEnum.SELECT_CURRENCY,
    payload: currency,
  }),
};
