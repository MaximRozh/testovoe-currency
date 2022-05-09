import React, { FC, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import ContentHeader from "../components/ContentHeader";
import Layout from "../components/Layout";
import { BASE_CURRENCY, isBtc, toFixed } from "../helpers";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { CurrencyActionCreator } from "../store/currency/action";

const CurrentCurrency: FC = () => {
  const { currencies, selectedCur } = useTypedSelector(
    (state) => state.currencyReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!currencies.length) {
      dispatch(CurrencyActionCreator.getCurencies());
    }
  }, [dispatch, currencies]);

  const ratesToCyrrency = useMemo(() => {
    const rate = currencies.find((item) => item.ccy === selectedCur)?.buy || 1;

    return currencies.map((item) => {
      let obj = { ...item };
      const isItemSelectedCyrrency = item.ccy === selectedCur;

      if (isBtc(item.ccy)) {
        const usdRate = currencies.find((item) => item.ccy === "USD")?.buy || 1;
        obj = { ...item, buy: toFixed((item.buy * usdRate) / rate) };
      }
      if (isItemSelectedCyrrency) {
        obj = { ccy: BASE_CURRENCY, buy: toFixed(1 / rate) };
      }
      if (!isItemSelectedCyrrency && !isBtc(item.ccy)) {
        obj = { ...item, buy: toFixed(item.buy / rate) };
      }

      return obj;
    });
  }, [currencies, selectedCur]);

  return (
    <Layout>
      <div className="currency-wrapper">
        <div className="foo">
          <div className="header-wrapper">
            {" "}
            <ContentHeader content="exchange rates" />
          </div>
          <div className="currency-rates">
            <div className="currency-rates-header">
              <span className="rates-header-text">Currency</span>
              <span className="rates-header-text">Amount</span>
            </div>
            <ul className="all-rates">
              {ratesToCyrrency.map((item) => (
                <li className="rate-item" key={item.ccy}>
                  <span className="rate-text">{item.ccy} :</span>{" "}
                  <span className="rate-text">{item.buy}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CurrentCurrency;
