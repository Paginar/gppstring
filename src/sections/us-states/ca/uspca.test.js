//const t = require("./");
import UspcaSection from "./uspca";

test("Create a default uspca section", () => {
  let uspca = new UspcaSection.Builder().build();
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
  let uspca = new UspcaSection.Builder().setSharingOptOutNotice(value).build();
  expect(uspca.encode2BitStr()).toBe(expected);
});

test.each([
  [0, "0000010000000000000000000000000000000000000000"],
  [1, "0000010101010101000000000000000000000001010101"],
  [2, "0000011010101010000000000000000000000010101010"],
])("all int(2) Notices = %i", (value, expected) => {
  let uspca = new UspcaSection.Builder()
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
])("setSaleOptOutNotice Notices = %i, to throw", (value, expected) => {
  expect(() => {
    let uspca = new UspcaSection.Builder().setSaleOptOutNotice(value).build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [4, ""],
  [null, ""],
  ["", ""],
  [undefined, ""],
])("setSharingOptOutNotice Notices = %i, to throw", (value, expected) => {
  expect(() => {
    let uspca = new UspcaSection.Builder()
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
])(
  "setSensitiveDataLimitUseNotice Notices = %i, to throw",
  (value, expected) => {
    expect(() => {
      let uspca = new UspcaSection.Builder()
        .setSensitiveDataLimitUseNotice(value)
        .build();
      uspca.encode2BitStr();
    }).toThrow();
  }
);

test.each([
  [4, ""],
  [null, ""],
  ["", ""],
  [undefined, ""],
])("setSaleOptOut Notices = %i, to throw", (value, expected) => {
  expect(() => {
    let uspca = new UspcaSection.Builder().setSaleOptOut(value).build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [4, ""],
  [null, ""],
  ["", ""],
  [undefined, ""],
])("setSharingOptOut Notices = %i, to throw", (value, expected) => {
  expect(() => {
    let uspca = new UspcaSection.Builder().setSharingOptOut(value).build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [4, ""],
  [null, ""],
  ["", ""],
  [undefined, ""],
])("setPersonalDataConsents Notices = %i, to throw", (value, expected) => {
  expect(() => {
    let uspca = new UspcaSection.Builder()
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
])("setMspaCoveredTransaction Notices = %i, to throw", (value, expected) => {
  expect(() => {
    let uspca = new UspcaSection.Builder()
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
])("setMspaOptOutOptionMode Notices = %i, to throw", (value, expected) => {
  expect(() => {
    let uspca = new UspcaSection.Builder()
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
])("setMspaServiceProviderMode Notices = %i, to throw", (value, expected) => {
  expect(() => {
    let uspca = new UspcaSection.Builder()
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
  let uspca = new UspcaSection.Builder()
    .setSensitiveDataProcessing(
      new Array(value, value, value, value, value, value, value, value, value)
    )
    .build();
  expect(uspca.encode2BitStr()).toBe(expected);
});

test("Calling setSensitiveDataProcessing with wrong array size", () => {
  expect(() => {
    let uspca = new UspcaSection.Builder()
      .setSensitiveDataProcessing(new Array(0))
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test("Calling setSensitiveDataProcessing with wrong values", () => {
  expect(() => {
    let uspca = new UspcaSection.Builder()
      .setSensitiveDataProcessing(new Array(4, 0, 0, 0, 0, 0, 0, 0, 0))
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [0, "0000010000000000000000000000000000000000000000"],
  [1, "0000010000000000000000000000000000010100000000"],
  [2, "0000010000000000000000000000000000101000000000"],
])("all setKnownChildSensitiveDataConsents Notices = %i", (value, expected) => {
  let uspca = new UspcaSection.Builder()
    .setKnownChildSensitiveDataConsents(new Array(value, value))
    .build();
  expect(uspca.encode2BitStr()).toBe(expected);
});

test("Calling setKnownChildSensitiveDataConsents with wrong array size", () => {
  expect(() => {
    let uspca = new UspcaSection.Builder()
      .setKnownChildSensitiveDataConsents(new Array(0))
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test("Calling setKnownChildSensitiveDataConsents with wrong values", () => {
  expect(() => {
    let uspca = new UspcaSection.Builder()
      .setKnownChildSensitiveDataConsents(new Array(4, 0, 0, 0, 0, 0, 0, 0, 0))
      .build();
    uspca.encode2BitStr();
  }).toThrow();
});

test.each([
  [0, "0000010000000000000000000000000000000000000000"],
  [1, "0000010101010101010101010101010101010101010101"],
  [2, "0000011010101010101010101010101010101010101010"],
])("all int(2) Notices = %i", (value, expected) => {
  let uspca = new UspcaSection.Builder()
    .setSaleOptOutNotice(value)
    .setSharingOptOutNotice(value)
    .setSensitiveDataLimitUseNotice(value)
    .setSaleOptOut(value)
    .setSharingOptOut(value)
    .setSensitiveDataProcessing(
      new Array(value, value, value, value, value, value, value, value, value)
    )
    .setKnownChildSensitiveDataConsents(new Array(value, value))
    .setPersonalDataConsents(value)
    .setMspaCoveredTransaction(value)
    .setMspaOptOutOptionMode(value)
    .setMspaServiceProviderMode(value)
    .build();
  expect(uspca.encode2BitStr()).toBe(expected);
});
