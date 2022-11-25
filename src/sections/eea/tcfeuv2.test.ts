/* eslint-disable @typescript-eslint/no-unused-vars */

import { TCFEuSectionEncoder } from "./tcfeuv2";

test("Create a default tcfeuv2 section", () => {
  const tcfeuv2 = new TCFEuSectionEncoder.Builder()
    .setCreated(new Date(2000, 1, 1, 1, 1))
    .setLastUpdated(new Date(2000, 1, 1, 1, 1))
    .build();
  expect(tcfeuv2.encode2BitStr()).toBe(
    "000010001000110101110111111000100011011000001000110101110111111000100011011000000000000000000000000000000000--000000000000000000100000000000000000000000000000000000000000000000000000000000000--00000000000000010000000000000000010000000000000000000000000000000000000100"
  );
});

test("Create a default tcfeuv2 section", () => {
  const tcfeuv2 = new TCFEuSectionEncoder.Builder()
    .setCreated(new Date(2000, 1, 1, 1, 1))
    .setLastUpdated(new Date(2000, 1, 1, 1, 1))
    .build();
  expect(tcfeuv2.encode()).toBe(
    "CI134jYI134jYAAAAAundefinedAAIAAAAAAAAAAAACAACAAAAAAg"
  );
});

// test.each([
//   [0, "0000010000000000000000000000000000000000000000"],
//   [1, "0000010100000000000000000000000000000000000000"],
//   [2, "0000011000000000000000000000000000000000000000"],
// ])("setSaleOptOutNotice = %i", (value, expected) => {
//   const uspca = new UspcaSectionEncoder.Builder()
//     .setSaleOptOutNotice(value)
//     .build();
//   expect(uspca.encode2BitStr()).toBe(expected);
// });

// test.each([
//   [0, "0000010000000000000000000000000000000000000000"],
//   [1, "0000010001000000000000000000000000000000000000"],
//   [2, "0000010010000000000000000000000000000000000000"],
// ])("setSharingOptOutNotice = %i", (value, expected) => {
//   const uspca = new UspcaSectionEncoder.Builder()
//     .setSharingOptOutNotice(value)
//     .build();
//   expect(uspca.encode2BitStr()).toBe(expected);
// });

// test.each([
//   [0, "0000010000000000000000000000000000000000000000"],
//   [1, "0000010101010101000000000000000000000001010101"],
//   [2, "0000011010101010000000000000000000000010101010"],
// ])("all int(2) Notices = %i", (value, expected) => {
//   const uspca = new UspcaSectionEncoder.Builder()
//     .setSaleOptOutNotice(value)
//     .setSharingOptOutNotice(value)
//     .setSensitiveDataLimitUseNotice(value)
//     .setSaleOptOut(value)
//     .setSharingOptOut(value)
//     .setPersonalDataConsents(value)
//     .setMspaCoveredTransaction(value)
//     .setMspaOptOutOptionMode(value)
//     .setMspaServiceProviderMode(value)
//     .build();
//   expect(uspca.encode2BitStr()).toBe(expected);
// });

// test.each([
//   [4, ""],
//   [null, ""],
//   ["", ""],
//   [undefined, ""],
// ])("setSaleOptOutNotice Notices = %i, to throw", (value, _) => {
//   expect(() => {
//     const uspca = new UspcaSectionEncoder.Builder()
//       // @ts-expect-error: this would trigger a compiler error
//       .setSaleOptOutNotice(value)
//       .build();
//     uspca.encode2BitStr();
//   }).toThrow();
// });

// test.each([
//   [4, ""],
//   [null, ""],
//   ["", ""],
//   [undefined, ""],
// ])("setSharingOptOutNotice Notices = %i, to throw", (value, _) => {
//   expect(() => {
//     const uspca = new UspcaSectionEncoder.Builder()
//       // @ts-expect-error: this would trigger a compiler error
//       .setSharingOptOutNotice(value)
//       .build();
//     uspca.encode2BitStr();
//   }).toThrow();
// });

// test.each([
//   [4, ""],
//   [null, ""],
//   ["", ""],
//   [undefined, ""],
// ])("setSensitiveDataLimitUseNotice Notices = %i, to throw", (value, _) => {
//   expect(() => {
//     const uspca = new UspcaSectionEncoder.Builder()
//       // @ts-expect-error: this would trigger a compiler error

//       .setSensitiveDataLimitUseNotice(value)
//       .build();
//     uspca.encode2BitStr();
//   }).toThrow();
// });

// test.each([
//   [4, ""],
//   [null, ""],
//   ["", ""],
//   [undefined, ""],
// ])("setSaleOptOut Notices = %i, to throw", (value, _) => {
//   expect(() => {
//     const uspca = new UspcaSectionEncoder.Builder()
//       // @ts-expect-error: this would trigger a compiler error
//       .setSaleOptOut(value)
//       .build();
//     uspca.encode2BitStr();
//   }).toThrow();
// });

// test.each([
//   [4, ""],
//   [null, ""],
//   ["", ""],
//   [undefined, ""],
// ])("setSharingOptOut Notices = %i, to throw", (value, _) => {
//   expect(() => {
//     const uspca = new UspcaSectionEncoder.Builder()
//       // @ts-expect-error: this would trigger a compiler error
//       .setSharingOptOut(value)
//       .build();
//     uspca.encode2BitStr();
//   }).toThrow();
// });

// test.each([
//   [4, ""],
//   [null, ""],
//   ["", ""],
//   [undefined, ""],
// ])("setPersonalDataConsents Notices = %i, to throw", (value, _) => {
//   expect(() => {
//     const uspca = new UspcaSectionEncoder.Builder()
//       // @ts-expect-error: this would trigger a compiler error
//       .setPersonalDataConsents(value)
//       .build();
//     uspca.encode2BitStr();
//   }).toThrow();
// });

// test.each([
//   [4, ""],
//   [null, ""],
//   ["", ""],
//   [undefined, ""],
// ])("setMspaCoveredTransaction Notices = %i, to throw", (value, _) => {
//   expect(() => {
//     const uspca = new UspcaSectionEncoder.Builder()
//       // @ts-expect-error: this would trigger a compiler error
//       .setMspaCoveredTransaction(value)
//       .build();
//     uspca.encode2BitStr();
//   }).toThrow();
// });

// test.each([
//   [4, ""],
//   [null, ""],
//   ["", ""],
//   [undefined, ""],
// ])("setMspaOptOutOptionMode Notices = %i, to throw", (value, _) => {
//   expect(() => {
//     const uspca = new UspcaSectionEncoder.Builder()
//       // @ts-expect-error: this would trigger a compiler error
//       .setMspaOptOutOptionMode(value)
//       .build();
//     uspca.encode2BitStr();
//   }).toThrow();
// });

// test.each([
//   [4, ""],
//   [null, ""],
//   ["", ""],
//   [undefined, ""],
// ])("setMspaServiceProviderMode Notices = %i, to throw", (value, _) => {
//   expect(() => {
//     const uspca = new UspcaSectionEncoder.Builder()
//       // @ts-expect-error: this would trigger a compiler error
//       .setMspaServiceProviderMode(value)
//       .build();
//     uspca.encode2BitStr();
//   }).toThrow();
// });

// test.each([
//   [0, "0000010000000000000000000000000000000000000000"],
//   [1, "0000010000000000010101010101010101000000000000"],
//   [2, "0000010000000000101010101010101010000000000000"],
// ])("all setSensitiveDataProcessing Notices = %i", (value, expected) => {
//   const uspca = new UspcaSectionEncoder.Builder()
//     .setSensitiveDataProcessing(Array(9).fill(value))
//     .build();
//   expect(uspca.encode2BitStr()).toBe(expected);
// });

// test("Calling setSensitiveDataProcessing with wrong array size", () => {
//   expect(() => {
//     const uspca = new UspcaSectionEncoder.Builder()
//       .setSensitiveDataProcessing([0])
//       .build();
//     uspca.encode2BitStr();
//   }).toThrow();
// });

// test("Calling setSensitiveDataProcessing with wrong values", () => {
//   expect(() => {
//     const uspca = new UspcaSectionEncoder.Builder()
//       .setSensitiveDataProcessing([4, 0, 0, 0, 0, 0, 0, 0, 0])
//       .build();
//     uspca.encode2BitStr();
//   }).toThrow();
// });

// test("Calling setKnownChildSensitiveDataConsents with wrong array size", () => {
//   expect(() => {
//     const uspca = new UspcaSectionEncoder.Builder()
//       .setKnownChildSensitiveDataConsents([0])
//       .build();
//     uspca.encode2BitStr();
//   }).toThrow();
// });

// test("Calling setKnownChildSensitiveDataConsents with wrong values", () => {
//   expect(() => {
//     const uspca = new UspcaSectionEncoder.Builder()
//       .setKnownChildSensitiveDataConsents([4, 0])
//       .build();
//     uspca.encode2BitStr();
//   }).toThrow();
// });

// test("Calling setKnownChildSensitiveDataConsents with [0,0]", () => {
//   const uspca = new UspcaSectionEncoder.Builder()
//     .setKnownChildSensitiveDataConsents([0, 0])
//     .build();
//   expect(uspca.encode2BitStr()).toBe(
//     "0000010000000000000000000000000000000000000000"
//   );
// });

// test.each([
//   [0, "0000010000000000000000000000000000000000000000"],
//   [1, "0000010000000000000000000000000000010100000000"],
//   [2, "0000010000000000000000000000000000101000000000"],
// ])("all setKnownChildSensitiveDataConsents Notices = %i", (value, expected) => {
//   const uspca = new UspcaSectionEncoder.Builder()
//     .setKnownChildSensitiveDataConsents(Array(2).fill(value))
//     .build();
//   expect(uspca.encode2BitStr()).toBe(expected);
// });

// test.each([
//   [0, "0000010000000000000000000000000000000000000000"],
//   [1, "0000010101010101010101010101010101010101010101"],
//   [2, "0000011010101010101010101010101010101010101010"],
// ])("all int(2) Notices = %i", (value, expected) => {
//   const uspca = new UspcaSectionEncoder.Builder()
//     .setSaleOptOutNotice(value)
//     .setSharingOptOutNotice(value)
//     .setSensitiveDataLimitUseNotice(value)
//     .setSaleOptOut(value)
//     .setSharingOptOut(value)
//     .setSensitiveDataProcessing(Array(9).fill(value))
//     .setKnownChildSensitiveDataConsents(Array(2).fill(value))
//     .setPersonalDataConsents(value)
//     .setMspaCoveredTransaction(value)
//     .setMspaOptOutOptionMode(value)
//     .setMspaServiceProviderMode(value)
//     .build();
//   expect(uspca.encode2BitStr()).toBe(expected);
// });
