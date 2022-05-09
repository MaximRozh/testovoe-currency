import CurrencyModel from "../Currency.model";

export default class Currencydapter {
  static mapCurrencyDtoToCurencies(currency: CurrencyModel): CurrencyModel {
    return new CurrencyModel({
      ccy: currency.ccy,
      buy: currency.buy,
    });
  }
}
