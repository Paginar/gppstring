import { encodeBitStr2Base64Websafe } from "./utils";

test("Encode to base64-websafe 000011", () => {
  expect(encodeBitStr2Base64Websafe("000011")).toBe("D");
});

test("Encode to base64-websafe 000001", () => {
  expect(encodeBitStr2Base64Websafe("000001")).toBe("B");
});

test("Encode to base64-websafe 000011 000001 000000 000001 0011", () => {
  expect(encodeBitStr2Base64Websafe("0000110000010000000000010011")).toBe(
    "DBABM"
  );
});

test("Encode to base64-websafe 000011 000001 000000 000010 001101 011", () => {
  expect(encodeBitStr2Base64Websafe("000011000001000000000010001101011")).toBe(
    "DBACNY"
  );
});

test("Encode to base64-websafe 000011 000001 000000 000001 100011 11", () => {
  expect(
    encodeBitStr2Base64Websafe("000011000001000000000001100011110000")
  ).toBe("DBABjw");
});
