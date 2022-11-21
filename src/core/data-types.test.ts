import {
  Boolean,
  IntegerFixedLength,
  IntegerFibonacci,
  StringFixedLength,
  Datetime,
  RangeInteger,
  RangeFibonacci,
  NBitfield,
} from "./data-types";

//
// Boolean
//

test("Initialize Boolean to true", () => {
  const bool = new Boolean.Builder().setValue(true).build();
  expect(bool.encode2BitStr()).toBe("1");
});

test("Initialize Boolean to false", () => {
  const bool = new Boolean.Builder().setValue(false).build();
  expect(bool.encode2BitStr()).toBe("0");
});

test("Initialize Boolean to truthy", () => {
  // @ts-expect-error: this would trigger a compiler error
  const bool = new Boolean.Builder().setValue("false").build();
  expect(bool.encode2BitStr()).toBe("1");
});

test("Initialize Boolean to falsey", () => {
  // @ts-expect-error: this would trigger a compiler error
  const bool = new Boolean.Builder().setValue(undefined).build();
  expect(bool.encode2BitStr()).toBe("0");
});

//
// IntegerFixedLength
//

test("Initialize IntegerFixedLength to value=0,length=1", () => {
  const integer = new IntegerFixedLength.Builder()
    .setLength(1)
    .setValue(0)
    .build();
  expect(integer.encode2BitStr()).toBe("0");
});

test("Initialize IntegerFixedLength to value=2000,length=11", () => {
  const integer = new IntegerFixedLength.Builder()
    .setLength(11)
    .setValue(2000)
    .build();
  expect(integer.encode2BitStr()).toBe("11111010000");
});

test("Initialize IntegerFixedLength to value=2000,length=10 must throw", () => {
  expect(() => {
    const integer = new IntegerFixedLength.Builder()
      .setLength(10)
      .setValue(2000)
      .build();
    integer.encode2BitStr();
  }).toThrow();
});

//
// IntegerFibonacci
//

test("Initialize IntegerFibonacci to value=0", () => {
  const integer = new IntegerFibonacci.Builder().setValue(0).build();
  expect(integer.encode2BitStr()).toBe("1");
});

test("Initialize IntegerFibonacci to value=1", () => {
  const integer = new IntegerFibonacci.Builder().setValue(1).build();
  expect(integer.encode2BitStr()).toBe("11");
});

test("Initialize IntegerFibonacci to value=2", () => {
  const integer = new IntegerFibonacci.Builder().setValue(2).build();
  expect(integer.encode2BitStr()).toBe("011");
});

test("Initialize IntegerFibonacci to value=7", () => {
  const integer = new IntegerFibonacci.Builder().setValue(7).build();
  expect(integer.encode2BitStr()).toBe("01011");
});

test("Initialize IntegerFibonacci to value=4000", () => {
  const integer = new IntegerFibonacci.Builder().setValue(4000).build();
  expect(integer.encode2BitStr()).toBe("000101010000101011");
});

test("Initialize IntegerFibonacci to value=-1, to throw", () => {
  expect(() => {
    new IntegerFibonacci.Builder().setValue(-1).build().encode2BitStr();
  }).toThrow();
});

//
// StringFixedLength
//

test("StringFixedLength of value 'k'", () => {
  expect(
    new StringFixedLength.Builder().setValue("k").build().encode2BitStr()
  ).toBe("101010");
});

test("StringFixedLength of value 'kkk'", () => {
  expect(
    new StringFixedLength.Builder().setValue("kkk").build().encode2BitStr()
  ).toBe("101010101010101010");
});

//
// Datetime
//

test("Datetime of value January 01 1970 00:00:00 UTC", () => {
  const date = new Date(0);
  expect(new Datetime.Builder().setValue(date).build().encode2BitStr()).toBe(
    "000000000000000000000000000000000000"
  );
});

test("Datetime of value January 01 2022 00:00:00 UTC", () => {
  const date = new Date(2022, 0, 1);
  expect(new Datetime.Builder().setValue(date).build().encode2BitStr()).toBe(
    "001111010010000111011010010011100000"
  );
});

//
// RangeInteger
//

test("RangeInteger of single value 2", () => {
  expect(new RangeInteger.Builder().addSingle(2).build().encode2BitStr()).toBe(
    "00000000000100000000000000010"
  );
});

test("RangeInteger of 2 single values: 2, 6", () => {
  expect(
    new RangeInteger.Builder().addSingle(2).addSingle(6).build().encode2BitStr()
  ).toBe("0000000000100000000000000001000000000000000100");
});

test("RangeInteger of 1 group values: 5-6", () => {
  expect(
    new RangeInteger.Builder().addGroup(5, 6).build().encode2BitStr()
  ).toBe("000000000001100000000000001010000000000000001");
});

test("RangeInteger of [3,5,6,7,8] 1 single value: 3, 1 group values: 5-8", () => {
  expect(
    new RangeInteger.Builder()
      .addSingle(3)
      .addGroup(5, 8)
      .build()
      .encode2BitStr()
  ).toBe("00000000001000000000000000011100000000000000100000000000000011");
});

//
// RangeFibonacci
//

test("RangeFibonacci of single value 2", () => {
  expect(
    new RangeFibonacci.Builder().addSingle(2).build().encode2BitStr()
  ).toBe("0000000000010011");
});

test("RangeFibonacci of 2 single values: 2, 6", () => {
  expect(
    new RangeFibonacci.Builder()
      .addSingle(2)
      .addSingle(6)
      .build()
      .encode2BitStr()
  ).toBe("000000000010001101011");
});

test("RangeFibonacci of 1 group values: 5-6", () => {
  expect(
    new RangeFibonacci.Builder().addGroup(5, 6).build().encode2BitStr()
  ).toBe("00000000000110001111");
});

test("RangeFibonacci of [3,5,6,7,8] 1 single value: 3, 1 group values: 5-8", () => {
  expect(
    new RangeFibonacci.Builder()
      .addSingle(3)
      .addGroup(5, 8)
      .build()
      .encode2BitStr()
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
      .encode2BitStr()
  ).toBe("00");
});

test("Create a NBitfield (NBitSize=2,numBits=1), with value Bit1=2", () => {
  expect(
    new NBitfield.Builder()
      .setNbitSize(2)
      .setNumBits(1)
      .setNBit(1, 2)
      .build()
      .encode2BitStr()
  ).toBe("10");
});

test("Create a NBitfield (NBitSize=2,numBits=1), with value Bit1=5, must throw", () => {
  expect(() => {
    new NBitfield.Builder()
      .setNbitSize(2)
      .setNumBits(1)
      .setNBit(1, 5)
      .build()
      .encode2BitStr();
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
      .encode2BitStr()
  ).toBe("1001");
});
