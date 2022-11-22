import { GPPHeader } from "./gpp-header";

test("Create an empty gpp header, must throw", () => {
  expect(() => {
    // @ts-expect-error: this would trigger a compiler error
    const gppHeader = new GPPHeader(null);
    gppHeader.encode2BitStr();
  }).toThrow();
});

test("Create a gpp header, with section = [2]", () => {
  const gppHeader = new GPPHeader([2]);
  expect(gppHeader.encode2BitStr()).toBe("0000110000010000000000010011");
});

test("Create a gpp header, with section = [2,6]", () => {
  const gppHeader = new GPPHeader([2, 6]);
  expect(gppHeader.encode2BitStr()).toBe("000011000001000000000010001101011");
});
