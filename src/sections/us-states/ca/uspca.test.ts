/* eslint-disable @typescript-eslint/no-unused-vars */

import { UspcaSection } from "./uspca";

test("Create a default uspca section", () => {
  const uspca = new UspcaSection.Builder().build();
  expect(uspca.encode2BitStr()).toBe(
    "0000010000000000000000000000000000000000000000"
  );
});

// test.each([
//   [0, "0000010000000000000000000000000000000000000000"],
//   [1, "0000010100000000000000000000000000000000000000"],
//   [2, "0000011000000000000000000000000000000000000000"],
// ])("setSaleOptOutNotice = %i", (value, expected) => {
//   let uspca = new UspcaSection.Builder().setSaleOptOutNotice(value).build();
//   expect(uspca.encode2BitStr()).toBe(expected);
// });

test.each([
  [0, "0000010000000000000000000000000000000000000000"],
  [1, "0000010001000000000000000000000000000000000000"],
  [2, "0000010010000000000000000000000000000000000000"],
])("setSharingOptOutNotice = %i", (value, expected) => {
  const uspca = new UspcaSection.Builder()
    .setSharingOptOutNotice(value)
    .build();
  expect(uspca.encode2BitStr()).toBe(expected);
});

test.each([
  [0, "0000010000000000000000000000000000000000000000"],
  [1, "0000010101010101000000000000000000000001010101"],
  [2, "0000011010101010000000000000000000000010101010"],
])("all int(2) Notices = %i", (value, expected) => {
  const uspca = new UspcaSection.Builder()
    .setSaleOptOutNotice(value)
    .setSharingOptOutNotice(value)
    .setSensitiveDataLimitUseNotice(value)
    .setSaleOptOut(value)
    .setSharingOptOut(value)
    .setPersonalDataConsents(value)
    .setMspaCoveredTransaction(value)
    .setMspaOptOutOptionMode(value)
    .setMspaServiceProviderMode(value)
    .build();
  expect(uspca.encode2BitStr()).toBe(expected);
});

test.each([
  [4, ""],
  [null, ""],
  ["", ""],
  [undefined, ""],
])("setSaleOptOutNotice Notices = %i, to throw", (value, _) => {
  expect(() => {
    // @ts-expect-error: this would trigger a compiler error
    const uspca = new UspcaSection.Builder().setSaleOptOutNotice(value).build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [4, ""],
  [null, ""],
  ["", ""],
  [undefined, ""],
])("setSharingOptOutNotice Notices = %i, to throw", (value, _) => {
  expect(() => {
    const uspca = new UspcaSection.Builder()
      // @ts-expect-error: this would trigger a compiler error
      .setSharingOptOutNotice(value)
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [4, ""],
  [null, ""],
  ["", ""],
  [undefined, ""],
])("setSensitiveDataLimitUseNotice Notices = %i, to throw", (value, _) => {
  expect(() => {
    const uspca = new UspcaSection.Builder()
      // @ts-expect-error: this would trigger a compiler error

      .setSensitiveDataLimitUseNotice(value)
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [4, ""],
  [null, ""],
  ["", ""],
  [undefined, ""],
])("setSaleOptOut Notices = %i, to throw", (value, _) => {
  expect(() => {
    // @ts-expect-error: this would trigger a compiler error
    const uspca = new UspcaSection.Builder().setSaleOptOut(value).build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [4, ""],
  [null, ""],
  ["", ""],
  [undefined, ""],
])("setSharingOptOut Notices = %i, to throw", (value, _) => {
  expect(() => {
    // @ts-expect-error: this would trigger a compiler error
    const uspca = new UspcaSection.Builder().setSharingOptOut(value).build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [4, ""],
  [null, ""],
  ["", ""],
  [undefined, ""],
])("setPersonalDataConsents Notices = %i, to throw", (value, _) => {
  expect(() => {
    const uspca = new UspcaSection.Builder()
      // @ts-expect-error: this would trigger a compiler error
      .setPersonalDataConsents(value)
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [4, ""],
  [null, ""],
  ["", ""],
  [undefined, ""],
])("setMspaCoveredTransaction Notices = %i, to throw", (value, _) => {
  expect(() => {
    const uspca = new UspcaSection.Builder()
      // @ts-expect-error: this would trigger a compiler error
      .setMspaCoveredTransaction(value)
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [4, ""],
  [null, ""],
  ["", ""],
  [undefined, ""],
])("setMspaOptOutOptionMode Notices = %i, to throw", (value, _) => {
  expect(() => {
    const uspca = new UspcaSection.Builder()
      // @ts-expect-error: this would trigger a compiler error
      .setMspaOptOutOptionMode(value)
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [4, ""],
  [null, ""],
  ["", ""],
  [undefined, ""],
])("setMspaServiceProviderMode Notices = %i, to throw", (value, _) => {
  expect(() => {
    const uspca = new UspcaSection.Builder()
      // @ts-expect-error: this would trigger a compiler error
      .setMspaServiceProviderMode(value)
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [0, "0000010000000000000000000000000000000000000000"],
  [1, "0000010000000000010101010101010101000000000000"],
  [2, "0000010000000000101010101010101010000000000000"],
])("all setSensitiveDataProcessing Notices = %i", (value, expected) => {
  const uspca = new UspcaSection.Builder()
    // @ts-expect-error: this would trigger a compiler error
    .setSensitiveDataProcessing([
      value,
      value,
      value,
      value,
      value,
      value,
      value,
      value,
      value,
    ])
    .build();
  expect(uspca.encode2BitStr()).toBe(expected);
});

test("Calling setSensitiveDataProcessing with wrong array size", () => {
  expect(() => {
    const uspca = new UspcaSection.Builder()
      // @ts-expect-error: this would trigger a compiler error
      .setSensitiveDataProcessing([0])
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test("Calling setSensitiveDataProcessing with wrong values", () => {
  expect(() => {
    const uspca = new UspcaSection.Builder()
      // @ts-expect-error: this would trigger a compiler error
      .setSensitiveDataProcessing([4, 0, 0, 0, 0, 0, 0, 0, 0])
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [0, "0000010000000000000000000000000000000000000000"],
  [1, "0000010000000000000000000000000000010100000000"],
  [2, "0000010000000000000000000000000000101000000000"],
])("all setKnownChildSensitiveDataConsents Notices = %i", (value, expected) => {
  const uspca = new UspcaSection.Builder()
    // @ts-expect-error: this would trigger a compiler error
    .setKnownChildSensitiveDataConsents([value, value])
    .build();
  expect(uspca.encode2BitStr()).toBe(expected);
});

test("Calling setKnownChildSensitiveDataConsents with wrong array size", () => {
  expect(() => {
    const uspca = new UspcaSection.Builder()
      // @ts-expect-error: this would trigger a compiler error
      .setKnownChildSensitiveDataConsents(new Array(0))
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test("Calling setKnownChildSensitiveDataConsents with wrong values", () => {
  expect(() => {
    const uspca = new UspcaSection.Builder()
      // @ts-expect-error: this would trigger a compiler error
      .setKnownChildSensitiveDataConsents([4, 0, 0, 0, 0, 0, 0, 0, 0])
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [0, "0000010000000000000000000000000000000000000000"],
  [1, "0000010101010101010101010101010101010101010101"],
  [2, "0000011010101010101010101010101010101010101010"],
])("all int(2) Notices = %i", (value, expected) => {
  const uspca = new UspcaSection.Builder()
    .setSaleOptOutNotice(value)
    .setSharingOptOutNotice(value)
    .setSensitiveDataLimitUseNotice(value)
    .setSaleOptOut(value)
    .setSharingOptOut(value)
    // @ts-expect-error: this would trigger a compiler error
    .setSensitiveDataProcessing([
      value,
      value,
      value,
      value,
      value,
      value,
      value,
      value,
      value,
    ])
    // @ts-expect-error: this would trigger a compiler error
    .setKnownChildSensitiveDataConsents([value, value])
    .setPersonalDataConsents(value)
    .setMspaCoveredTransaction(value)
    .setMspaOptOutOptionMode(value)
    .setMspaServiceProviderMode(value)
    .build();
  expect(uspca.encode2BitStr()).toBe(expected);
});
