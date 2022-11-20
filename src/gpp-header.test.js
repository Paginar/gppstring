//const t = require("./");
import GPPHeader from "./gpp-header";

test("Create an empty gpp header, must throw", () => {
  expect(() => {
    let gppHeader = new GPPHeader.build();
    gppHeader.encode();
  }).toThrow();
});

test("Create a gpp header, with section = [2]", () => {
  let gppHeader = new GPPHeader([2]);
  expect(gppHeader.encode()).toBe("0000110000010000000000010011");
});

test("Create a gpp header, with section = [2,6]", () => {
  let gppHeader = new GPPHeader([2, 6]);
  expect(gppHeader.encode()).toBe("000011000001000000000010001101011");
});
