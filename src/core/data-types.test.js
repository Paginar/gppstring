//const t = require("./");
import {
  Boolean,
  IntegerFixedLength,
  IntegerFibonacci,
  StringFixedLength,
  RangeFibonacci,
  NBitfield,
} from "./data-types";

//
// Boolean
//

test("Initialize Boolean to true", () => {
  const bool = new Boolean.Builder().setValue(true).build();
  expect(bool.encode()).toBe("1");
});

test("Initialize Boolean to false", () => {
  const bool = new Boolean.Builder().setValue(false).build();
  expect(bool.encode()).toBe("0");
});

test("Initialize Boolean to truthy", () => {
  const bool = new Boolean.Builder().setValue("false").build();
  expect(bool.encode()).toBe("1");
});

test("Initialize Boolean to falsey", () => {
  const bool = new Boolean.Builder().setValue(undefined).build();
  expect(bool.encode()).toBe("0");
});

//
// IntegerFixedLength
//

test("Initialize IntegerFixedLength to value=0,length=1", () => {
  const integer = new IntegerFixedLength.Builder()
    .setLength(1)
    .setValue(0)
    .build();
  expect(integer.encode()).toBe("0");
});

test("Initialize IntegerFixedLength to value=2000,length=11", () => {
  const integer = new IntegerFixedLength.Builder()
    .setLength(11)
    .setValue(2000)
    .build();
  expect(integer.encode()).toBe("11111010000");
});

test("Initialize IntegerFixedLength to value=2000,length=10 must throw", () => {
  expect(() => {
    const integer = new IntegerFixedLength.Builder()
      .setLength(10)
      .setValue(2000)
      .build();
    integer.encode();
  }).toThrow();
});

//
// IntegerFibonacci
//

test("Initialize IntegerFibonacci to value=0", () => {
  const integer = new IntegerFibonacci.Builder().setValue(0).build();
  expect(integer.encode()).toBe("1");
});

test("Initialize IntegerFibonacci to value=1", () => {
  const integer = new IntegerFibonacci.Builder().setValue(1).build();
  expect(integer.encode()).toBe("11");
});

test("Initialize IntegerFibonacci to value=2", () => {
  const integer = new IntegerFibonacci.Builder().setValue(2).build();
  expect(integer.encode()).toBe("011");
});

test("Initialize IntegerFibonacci to value=7", () => {
  const integer = new IntegerFibonacci.Builder().setValue(7).build();
  expect(integer.encode()).toBe("01011");
});

test("Initialize IntegerFibonacci to value=4000", () => {
  const integer = new IntegerFibonacci.Builder().setValue(4000).build();
  expect(integer.encode()).toBe("000101010000101011");
});

test("Initialize IntegerFibonacci to value=-1, to throw", () => {
  expect(() => {
    new IntegerFibonacci.Builder().setValue(-1).build().encode();
  }).toThrow();
});

//
// StringFixedLength
//

test("StringFixedLength of value 'k'", () => {
  expect(new StringFixedLength.Builder().setValue("k").build().encode()).toBe(
    "101010"
  );
});

test("StringFixedLength of value 'kkk'", () => {
  expect(new StringFixedLength.Builder().setValue("kkk").build().encode()).toBe(
    "101010101010101010"
  );
});

//
// RangeFibonacci
//

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

//
// NBitField
//

test("Create a NBitfield (NBitSize=2,numBits=1), with value Bit1=0", () => {
  expect(
    new NBitfield.Builder()
      .setNbitSize(2)
      .setNumBits(1)
      .setNBit(1, 0)
      .build()
      .encode()
  ).toBe("00");
});

test("Create a NBitfield (NBitSize=2,numBits=1), with value Bit1=2", () => {
  expect(
    new NBitfield.Builder()
      .setNbitSize(2)
      .setNumBits(1)
      .setNBit(1, 2)
      .build()
      .encode()
  ).toBe("10");
});

test("Create a NBitfield (NBitSize=2,numBits=1), with value Bit1=5, must throw", () => {
  expect(() => {
    new NBitfield.Builder()
      .setNbitSize(2)
      .setNumBits(1)
      .setNBit(1, 5)
      .build()
      .encode();
  }).toThrow();
});

test("Create a NBitfield (NBitSize=2,numBits=2), with values Bit1=2,Bit2=1", () => {
  expect(
    new NBitfield.Builder()
      .setNbitSize(2)
      .setNumBits(2)
      .setNBit(1, 2)
      .setNBit(2, 1)
      .build()
      .encode()
  ).toBe("1001");
});
