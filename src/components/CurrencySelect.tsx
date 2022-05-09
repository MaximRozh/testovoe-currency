import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { CurrencyActionCreator } from "../store/currency/action";

const CurrencySelect: FC = () => {
  const { currenciesCode, selectedCur } = useTypedSelector(
    (state) => state.currencyReducer
  );
  const dispatch = useDispatch();

  const handler = (value: string) => {
    dispatch(CurrencyActionCreator.selectCurrency(value));
  };

  return (
    <select value={selectedCur} onChange={(e) => handler(e.target.value)}>
      {currenciesCode.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelect;
