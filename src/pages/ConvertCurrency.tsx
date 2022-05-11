import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ConvertContent from "../components/ConvertContent";
import HeroImage from "../components/HeroImage";
import Layout from "../components/Layout";
import {
  BASE_CURRENCY,
  getCurrencyIndex,
  isBtc,
  isUah,
  splitedText,
  toFixed,
  validation,
} from "../helpers";
import { useDebaunce } from "../hooks/useDebaunce";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { CurrencyActionCreator } from "../store/currency/action";

const ConvertCurrency = () => {
  const { currencies, selectedCur } = useTypedSelector(
    (state) => state.currencyReducer
  );

  const dispatch = useDispatch();

  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (!currencies.length) {
      dispatch(CurrencyActionCreator.getCurencies());
    }
  }, [dispatch, currencies]);

  const convertTextIntoResult = (text: string) => {
    const { fromCurrency, toCurrency, amount } = splitedText(text);
    const validate = validation(fromCurrency, toCurrency, amount, currencies);
    //validation
    if (validate) {
      setHasError(true);
      setResult("");
      return;
    }
    setHasError(false);

    //find rates index
    const indexFrom = getCurrencyIndex(currencies, fromCurrency);
    const indexTo = getCurrencyIndex(currencies, toCurrency);

    const rateForm = currencies[indexFrom]?.buy || 1;
    const rateTo = currencies[indexTo]?.buy || 1;

    //calculation
    //for UAH
    let rate = 0;

    const fromCurrencyIsUAH = isUah(fromCurrency);
    const toCurrencyIsUAH = isUah(toCurrency);

    if (fromCurrencyIsUAH || toCurrencyIsUAH) {
      rate = fromCurrencyIsUAH ? amount / rateTo : amount * rateForm;
    }

    //for BTC
    const fromCurrencyIsBTC = isBtc(fromCurrency);
    const toCurrencyIsBTC = isBtc(toCurrency);

    if (fromCurrencyIsBTC || toCurrencyIsBTC) {
      //cause bts is only in usd currency
      const usdRate = currencies.find((item) => item.ccy === "USD")!.buy;

      rate = fromCurrencyIsBTC
        ? ((rateForm * usdRate) / rateTo) * amount
        : (rateForm / usdRate / rateTo) * amount;
    }

    const hasBtc = fromCurrencyIsBTC || toCurrencyIsBTC;
    const hasUah = fromCurrencyIsUAH || toCurrencyIsUAH;

    //result
    const sum = hasUah || hasBtc ? rate : (amount * rateForm) / rateTo;
    const resultValuete = toCurrencyIsUAH
      ? BASE_CURRENCY
      : currencies[indexTo]?.ccy;

    setResult(`${toFixed(sum)} ${resultValuete}`);
  };

  const convert = useDebaunce(convertTextIntoResult, 500);

  const handler = (value: string) => {
    setValue(value);
    convert(value);
  };

  return (
    <Layout>
      <div className="currency-wrapper">
        <ConvertContent
          value={value}
          handler={handler}
          result={result}
          hasError={hasError}
          selectedCur={selectedCur}
        />
        <HeroImage />
      </div>
    </Layout>
  );
};

export default ConvertCurrency;
