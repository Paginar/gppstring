/* eslint-disable @typescript-eslint/no-unused-vars */

import { Uspv1Section, Uspv1Values } from "./uspv1";

test("Create a default uspca section", () => {
  const uspv1 = new Uspv1Section.Builder().build();
  expect(uspv1.encode2BitStr()).toBe("1---");
});

test.each([
  [Uspv1Values.NA, "1---"],
  [Uspv1Values.YES, "1Y--"],
  [Uspv1Values.NO, "1N--"],
])("setNoticeOptOut = %i", (value, expected) => {
  const uspv1 = new Uspv1Section.Builder().setNoticeOptOut(value).build();
  expect(uspv1.encode2BitStr()).toBe(expected);
});

test.each([
  [Uspv1Values.NA, "1---"],
  [Uspv1Values.YES, "1-Y-"],
  [Uspv1Values.NO, "1-N-"],
])("setSaleOptOut = %i", (value, expected) => {
  const uspv1 = new Uspv1Section.Builder().setSaleOptOut(value).build();
  expect(uspv1.encode2BitStr()).toBe(expected);
});

test.each([
  [Uspv1Values.NA, "1---"],
  [Uspv1Values.YES, "1--Y"],
  [Uspv1Values.NO, "1--N"],
])("setLspaCoveredTransaction = %i", (value, expected) => {
  const uspv1 = new Uspv1Section.Builder()
    .setLspaCoveredTransaction(value)
    .build();
  expect(uspv1.encode2BitStr()).toBe(expected);
});

test.each([
  [Uspv1Values.NA, "1---"],
  [Uspv1Values.YES, "1YYY"],
  [Uspv1Values.NO, "1NNN"],
])("setLspaCoveredTransaction = %i", (value, expected) => {
  const uspv1 = new Uspv1Section.Builder()
    .setSaleOptOut(value)
    .setNoticeOptOut(value)
    .setLspaCoveredTransaction(value)
    .build();
  expect(uspv1.encode2BitStr()).toBe(expected);
});
