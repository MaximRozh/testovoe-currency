import axios from "axios";
import Currencydapter from "../models/adapters/currency.adapter";
import CurrencyModel from "../models/Currency.model";

const baseUrl =
  "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11";

class CurrencyService {
  constructor(private _baseUrl: string) {}

  async getCurrency() {
    let res = await axios.get(this._baseUrl);
    return res.data.map((item: CurrencyModel) =>
      Currencydapter.mapCurrencyDtoToCurencies(item)
    );
  }
}

export default new CurrencyService(baseUrl);
