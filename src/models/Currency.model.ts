export default class CurrencyModel {
  ccy: string;
  buy: number;
  constructor(data: CurrencyModel) {
    this.ccy = data.ccy;
    this.buy = data.buy;
  }
}
