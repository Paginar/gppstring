//const t = require("./");
import UspcaSection from "./uspca";

test("Create a default uspca section", () => {
  let uspca = new UspcaSection.Builder().build();
  expect(uspca.encode()).toBe("0000010000000000000000000000000000000000000000");
});

test.each([
  [0, "0000010000000000000000000000000000000000000000"],
  [1, "0000010100000000000000000000000000000000000000"],
  [2, "0000011000000000000000000000000000000000000000"],
])("setSaleOptOutNotice = %i", (value, expected) => {
  let uspca = new UspcaSection.Builder().setSaleOptOutNotice(value).build();
  expect(uspca.encode()).toBe(expected);
});

test.each([
  [0, "0000010000000000000000000000000000000000000000"],
  [1, "0000010001000000000000000000000000000000000000"],
  [2, "0000010010000000000000000000000000000000000000"],
])("setSharingOptOutNotice = %i", (value, expected) => {
  let uspca = new UspcaSection.Builder().setSharingOptOutNotice(value).build();
  expect(uspca.encode()).toBe(expected);
});
