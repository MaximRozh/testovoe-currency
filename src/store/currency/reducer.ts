import { CurrencyState, CurrencyActionEnum, CurrencyAction } from "./types";

const initialState: CurrencyState = {
  currencies: [],
  selectedCur: "UAH",
  currenciesCode: [],
};

export default function currencyReducer(
  state = initialState,
  action: CurrencyAction
): CurrencyState {
  switch (action.type) {
    case CurrencyActionEnum.GET_CURRENCY:
      return { ...state, currencies: action.payload };
    case CurrencyActionEnum.SELECT_CURRENCY:
      return { ...state, selectedCur: action.payload };
    case CurrencyActionEnum.SET_CURRENCY_CODE:
      return { ...state, currenciesCode: action.payload };
    default:
      return state;
  }
}
