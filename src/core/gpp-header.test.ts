import { GPPHeaderEncoder } from "./gpp-header";

test("Create an empty gpp header, must throw", () => {
  expect(() => {
    // @ts-expect-error: this would trigger a compiler error
    const gppHeader = new GPPHeaderEncoder(null);
    gppHeader.encode2BitStr();
  }).toThrow();
});

test("Create a gpp header, with section = 2", () => {
  const gppHeader = new GPPHeaderEncoder.Builder().addSingleSection(2).build();
  expect(gppHeader.encode2BitStr()).toBe("0000110000010000000000010011");
});
test("Create a gpp header, with section = 2", () => {
  const gppHeader = new GPPHeaderEncoder.Builder().addSingleSection(2).build();
  expect(gppHeader.encode()).toBe("DBABM");
});

test("Create a gpp header, with section = 2,6", () => {
  const gppHeader = new GPPHeaderEncoder.Builder()
    .addSingleSection(2)
    .addSingleSection(6)
    .build();
  expect(gppHeader.encode2BitStr()).toBe("000011000001000000000010001101011");
});

test("Create a gpp header, with section = [2,6]", () => {
  const gppHeader = new GPPHeaderEncoder.Builder()
    .addSingleSection(2)
    .addSingleSection(6)
    .build();
  expect(gppHeader.encode()).toBe("DBACNY");
});

test("Create a gpp header, with section = [5,6]", () => {
  const gppHeader = new GPPHeaderEncoder.Builder()
    .addRangeSection(5, 6)
    .build();
  expect(gppHeader.encode2BitStr()).toBe("00001100000100000000000110001111");
});

test("Create a gpp header, with section = [5,6]", () => {
  const gppHeader = new GPPHeaderEncoder.Builder()
    .addRangeSection(5, 6)
    .build();
  expect(gppHeader.encode()).toBe("DBABjw");
});
