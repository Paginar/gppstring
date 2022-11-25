import {
  GPPBoolean,
  GPPIntegerFixedLength,
  GPPIntegerFibonacci,
  GPPStringFixedLength,
  GPPDatetime,
  GPPRangeInteger,
  GPPRangeFibonacci,
  GPPNBitfield,
  GPPBitfield,
  GPPOptimizedIntRange,
  GPPCountryCode,
} from "./data-types";

//
// GPPBoolean
//

test("Initialize GPPBoolean to true", () => {
  const bool = new GPPBoolean.Builder().setValue(true).build();
  expect(bool.encode2BitStr()).toBe("1");
});

test("Initialize GPPBoolean to false", () => {
  const bool = new GPPBoolean.Builder().setValue(false).build();
  expect(bool.encode2BitStr()).toBe("0");
});

test("Initialize GPPBoolean to truthy", () => {
  // @ts-expect-error: this would trigger a compiler error
  const bool = new GPPBoolean.Builder().setValue("false").build();
  expect(bool.encode2BitStr()).toBe("1");
});

test("Initialize GPPBoolean to falsey", () => {
  // @ts-expect-error: this would trigger a compiler error
  const bool = new GPPBoolean.Builder().setValue(undefined).build();
  expect(bool.encode2BitStr()).toBe("0");
});

//
// GPPIntegerFixedLength
//

test("Initialize GPPIntegerFixedLength to value=0,length=1", () => {
  const integer = new GPPIntegerFixedLength.Builder()
    .setLength(1)
    .setValue(0)
    .build();
  expect(integer.encode2BitStr()).toBe("0");
});

test("Initialize GPPIntegerFixedLength to value=2000,length=11", () => {
  const integer = new GPPIntegerFixedLength.Builder()
    .setLength(11)
    .setValue(2000)
    .build();
  expect(integer.encode2BitStr()).toBe("11111010000");
});

test("Initialize GPPIntegerFixedLength to value=2000,length=10 must throw", () => {
  expect(() => {
    const integer = new GPPIntegerFixedLength.Builder()
      .setLength(10)
      .setValue(2000)
      .build();
    integer.encode2BitStr();
  }).toThrow();
});

//
// GPPIntegerFibonacci
//

test("Initialize GPPIntegerFibonacci to value=0", () => {
  const integer = new GPPIntegerFibonacci.Builder().setValue(0).build();
  expect(integer.encode2BitStr()).toBe("1");
});

test("Initialize GPPIntegerFibonacci to value=1", () => {
  const integer = new GPPIntegerFibonacci.Builder().setValue(1).build();
  expect(integer.encode2BitStr()).toBe("11");
});

test("Initialize GPPIntegerFibonacci to value=2", () => {
  const integer = new GPPIntegerFibonacci.Builder().setValue(2).build();
  expect(integer.encode2BitStr()).toBe("011");
});

test("Initialize GPPIntegerFibonacci to value=7", () => {
  const integer = new GPPIntegerFibonacci.Builder().setValue(7).build();
  expect(integer.encode2BitStr()).toBe("01011");
});

test("Initialize GPPIntegerFibonacci to value=4000", () => {
  const integer = new GPPIntegerFibonacci.Builder().setValue(4000).build();
  expect(integer.encode2BitStr()).toBe("000101010000101011");
});

test("Initialize GPPIntegerFibonacci to value=-1, to throw", () => {
  expect(() => {
    new GPPIntegerFibonacci.Builder().setValue(-1).build().encode2BitStr();
  }).toThrow();
});

//
// GPPStringFixedLength
//

test("GPPStringFixedLength of value 'k'", () => {
  expect(
    new GPPStringFixedLength.Builder().setValue("k").build().encode2BitStr()
  ).toBe("101010");
});

test("GPPStringFixedLength of value 'kkk'", () => {
  expect(
    new GPPStringFixedLength.Builder().setValue("kkk").build().encode2BitStr()
  ).toBe("101010101010101010");
});

//
// GPPDatetime
//

test("GPPDatetime of value January 01 1970 00:00:00 UTC", () => {
  const date = new Date(0);
  expect(new GPPDatetime.Builder().setValue(date).build().encode2BitStr()).toBe(
    "000000000000000000000000000000000000"
  );
});

test("GPPDatetime of value January 01 2022 00:00:00 UTC", () => {
  const date = new Date(2022, 0, 1);
  expect(new GPPDatetime.Builder().setValue(date).build().encode2BitStr()).toBe(
    "001111010010000111011010010011100000"
  );
});

//
// GPPRangeInteger
//

test("GPPRangeInteger of single value 2", () => {
  expect(
    new GPPRangeInteger.Builder().addSingle(2).build().encode2BitStr()
  ).toBe("00000000000100000000000000010");
});

test("GPPRangeInteger of 2 single values: 2, 6", () => {
  expect(
    new GPPRangeInteger.Builder()
      .addSingle(2)
      .addSingle(6)
      .build()
      .encode2BitStr()
  ).toBe("0000000000100000000000000001000000000000000100");
});

test("GPPRangeInteger of 1 group values: 5-6", () => {
  expect(
    new GPPRangeInteger.Builder().addGroup(5, 6).build().encode2BitStr()
  ).toBe("000000000001100000000000001010000000000000001");
});

test("GPPRangeInteger of [3,5,6,7,8] 1 single value: 3, 1 group values: 5-8", () => {
  expect(
    new GPPRangeInteger.Builder()
      .addSingle(3)
      .addGroup(5, 8)
      .build()
      .encode2BitStr()
  ).toBe("00000000001000000000000000011100000000000000100000000000000011");
});

//
// GPPRangeFibonacci
//

test("GPPRangeFibonacci of single value 2", () => {
  expect(
    new GPPRangeFibonacci.Builder().addSingle(2).build().encode2BitStr()
  ).toBe("0000000000010011");
});

test("GPPRangeFibonacci of 2 single values: 2, 6", () => {
  expect(
    new GPPRangeFibonacci.Builder()
      .addSingle(2)
      .addSingle(6)
      .build()
      .encode2BitStr()
  ).toBe("000000000010001101011");
});

test("GPPRangeFibonacci of 1 group values: 5-6", () => {
  expect(
    new GPPRangeFibonacci.Builder().addGroup(5, 6).build().encode2BitStr()
  ).toBe("00000000000110001111");
});

test("GPPRangeFibonacci of [3,5,6,7,8] 1 single value: 3, 1 group values: 5-8", () => {
  expect(
    new GPPRangeFibonacci.Builder()
      .addSingle(3)
      .addGroup(5, 8)
      .build()
      .encode2BitStr()
  ).toBe("0000000000100001110110011");
});

//
// BitField
//

test("Create a GPPBitfield but forgot to set the length, must throw", () => {
  expect(() => {
    new GPPBitfield.Builder().setValues([5]).build().encode2BitStr();
  }).toThrow();
});

test("Create a GPPBitfield (length=1), with value [2], must throw", () => {
  expect(() => {
    new GPPBitfield.Builder()
      .setLength(1)
      .setValues([2])
      .build()
      .encode2BitStr();
  }).toThrow();
});

test("Create a GPPBitfield (length=2), with values [0,0]", () => {
  expect(
    new GPPBitfield.Builder()
      .setLength(2)
      .setValues([0, 0])
      .build()
      .encode2BitStr()
  ).toBe("00");
});

test("Create a GPPBitfield (length=2), with values [0,1]", () => {
  expect(
    new GPPBitfield.Builder()
      .setLength(2)
      .setValues([0, 1])
      .build()
      .encode2BitStr()
  ).toBe("01");
});

test("Create a GPPBitfield (length=9), with values Array(9).fill(0)", () => {
  expect(
    new GPPBitfield.Builder()
      .setLength(9)
      .setValues(Array(9).fill(0))
      .build()
      .encode2BitStr()
  ).toBe("000000000");
});

//
// NBitField
//

test("Create a GPPNBitfield but forgot to set the length, must throw", () => {
  expect(() => {
    new GPPNBitfield.Builder()
      .setBitSize(2)
      .setValues([5])
      .build()
      .encode2BitStr();
  }).toThrow();
});

test("Create a GPPNBitfield but forgot to set the bitSize, must throw", () => {
  expect(() => {
    new GPPNBitfield.Builder()
      .setLength(2)
      .setValues([5])
      .build()
      .encode2BitStr();
  }).toThrow();
});

test("Create a GPPNBitfield (length=1), with value [0]", () => {
  expect(
    new GPPNBitfield.Builder()
      .setLength(1)
      .setBitSize(2)
      .setValues([0])
      .build()
      .encode2BitStr()
  ).toBe("00");
});

test("Create a GPPNBitfield (length=1), with value [2]", () => {
  expect(
    new GPPNBitfield.Builder()
      .setLength(1)
      .setBitSize(2)
      .setValues([2])
      .build()
      .encode2BitStr()
  ).toBe("10");
});

test("Create a GPPNBitfield (length=1), with value [5], must throw", () => {
  expect(() => {
    new GPPNBitfield.Builder()
      .setLength(1)
      .setBitSize(2)
      .setValues([5])
      .build()
      .encode2BitStr();
  }).toThrow();
});

test("Create a GPPNBitfield (length=2, bitSize=2), with values [2,1]", () => {
  expect(
    new GPPNBitfield.Builder()
      .setLength(2)
      .setBitSize(2)
      .setValues([2, 1])
      .build()
      .encode2BitStr()
  ).toBe("1001");
});

test("Create a GPPNBitfield (length=2, bitSize=2), with values [0,0]", () => {
  expect(
    new GPPNBitfield.Builder()
      .setLength(2)
      .setBitSize(2)
      .setValues([0, 0])
      .build()
      .encode2BitStr()
  ).toBe("0000");
});

test("Create a GPPNBitfield (length=9, bitSize=2), with values Array(9).fill(0)", () => {
  expect(
    new GPPNBitfield.Builder()
      .setLength(9)
      .setBitSize(2)
      .setValues(Array(9).fill(0))
      .build()
      .encode2BitStr()
  ).toBe("000000000000000000");
});

//
// GPPOptimizedIntRange
//

test("Create a GPPOptimizedIntRange", () => {
  expect(new GPPOptimizedIntRange.Builder().build().encode2BitStr()).toBe("");
});

test("Create a GPPOptimizedIntRange, with Bitfield([0]) ", () => {
  expect(
    new GPPOptimizedIntRange.Builder()
      .setValuesAsBitfield([0])
      .build()
      .encode2BitStr()
  ).toBe("000000000000000100");
});

test("Create a GPPOptimizedIntRange, with Bitfield([0,1]) ", () => {
  expect(
    new GPPOptimizedIntRange.Builder()
      .setValuesAsBitfield([0, 1])
      .build()
      .encode2BitStr()
  ).toBe("0000000000000010001");
});

test("Create a GPPOptimizedIntRange, with Range(10,20) ", () => {
  expect(
    new GPPOptimizedIntRange.Builder()
      .setValuesAsRange(10, 20)
      .build()
      .encode2BitStr()
  ).toBe("00000000000101001000000000001100000000000010100000000000001010");
});
