import React from "react";
import ConvertCurrency from "../pages/ConvertCurrency";
import CurrentCurrency from "../pages/CurrentCurrency";

export interface Routes {
  path: string;
  component: React.ComponentType;
  name?: string;
}

export enum RouterNames {
  HOME = "/",
  CURRENT_CURRENCY = "/current-currency",
}

export const routes: Routes[] = [
  {
    path: RouterNames.HOME,
    component: ConvertCurrency,
    name: "Currency converter",
  },
  {
    path: RouterNames.CURRENT_CURRENCY,
    component: CurrentCurrency,
    name: "Exchange rates",
  },
];
