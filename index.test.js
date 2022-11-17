//const t = require("./");
import {
  Boolean,
  IntegerFixedLength,
  RangeFibonacci,
  fibonacciEncoding,
} from "./";

test("Initialize Boolean to true", () => {
  const bool = new Boolean.Builder().setValue(true).build();
  expect(bool.encode()).toBe("1");
});

test("Initialize Boolean to false", () => {
  const bool = new Boolean.Builder().setValue(false).build();
  expect(bool.encode()).toBe("0");
});

test("Initialize Boolean to truthy", () => {
  const bool = new Boolean.Builder().setValue(1).build();
  expect(bool.encode()).toBe("1");
});

test("Initialize Boolean to falsey", () => {
  const bool = new Boolean.Builder().setValue(0).build();
  expect(bool.encode()).toBe("0");
});

test("Initialize IntegerFixedLength to 0,1", () => {
  const integer = new IntegerFixedLength.Builder().setValue(0, 1).build();
  expect(integer.encode()).toBe("0");
});

test("Initialize IntegerFixedLength to 2000,11", () => {
  const integer = new IntegerFixedLength.Builder().setValue(2000, 11).build();
  expect(integer.encode()).toBe("11111010000");
});

test("Initialize IntegerFixedLength to 2000,10 must throw", () => {
  const integer = new IntegerFixedLength.Builder().setValue(2000, 10).build();
  expect(() => {
    integer.encode();
  }).toThrow();
});

test("FibonacciEncoding for 1", () => {
  expect(fibonacciEncoding(1)).toBe("11");
});

test("FibonacciEncoding for 2", () => {
  expect(fibonacciEncoding(2)).toBe("011");
});

test("FibonacciEncoding for 3", () => {
  expect(fibonacciEncoding(3)).toBe("0011");
});

test("FibonacciEncoding for 2645", () => {
  expect(fibonacciEncoding(2645)).toBe("100100001000000011");
});

test("RangeFibonacci of single value 2", () => {
  expect(new RangeFibonacci.Builder().addSingle(2).build().encode()).toBe(
    "0000000000010011"
  );
});

test("RangeFibonacci of 2 single values: 2, 6", () => {
  expect(
    new RangeFibonacci.Builder().addSingle(2).addSingle(6).build().encode()
  ).toBe("000000000010001101011");
});

test("RangeFibonacci of 1 group values: 5-6", () => {
  expect(new RangeFibonacci.Builder().addGroup(5, 6).build().encode()).toBe(
    "00000000000110001111"
  );
});

test("RangeFibonacci of [3,5,6,7,8] 1 single value: 3, 1 group values: 5-8", () => {
  expect(
    new RangeFibonacci.Builder().addSingle(3).addGroup(5, 8).build().encode()
  ).toBe("0000000000100001110110011");
});
