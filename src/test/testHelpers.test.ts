import React from "react";
import { splitedText, validation } from "../helpers/index";
import { currencies } from "./testUtils";

describe("Check Utils", () => {
  it("Splite typed text into objet", () => {
    const result = splitedText("15 usd in uah");
    const expectedObject = {
      amount: 15,
      fromCurrency: "usd",
      toCurrency: "uah",
    };
    expect(result).toEqual(expectedObject);
  });
});

describe("Valid text", () => {
  it("Is valid text", () => {
    const inValidTextToUAH = validation("usd", "uah", 15, currencies);
    const inValidTextFromMUAH = validation("uah", "usd", 15, currencies);
    const inValidText = validation("usd", "eur", 15, currencies);

    expect(inValidText).toBe(false);
    expect(inValidTextFromMUAH).toBe(false);
    expect(inValidTextToUAH).toBe(false);
  });
  it("Is not valid text", () => {
    const inValidLeft = validation("WRONG", "usd", 15, currencies);
    const inValidRight = validation("usd", "WRONG", 15, currencies);
    const hasEmpty = validation("", "usd", 15, currencies);

    expect(inValidLeft).toBe(true);
    expect(inValidRight).toBe(true);
    expect(hasEmpty).toBe(true);
  });
});
