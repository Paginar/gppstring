import { GPPStringEncoder } from "./gpp-str";
import { UspcaSectionEncoder } from "../sections/us-states/ca/uspca";
import {
  Uspv1SectionEncoder,
  Uspv1Values,
} from "../sections/us-states/ca/uspv1";

test("Create an empty gpp string, must throw", () => {
  expect(() => {
    const gppString = new GPPStringEncoder.Builder().build();
    gppString.encode2BitStr();
  }).toThrow();
});

test("Create a default uspca section bit string encoded", () => {
  const uspca = new UspcaSectionEncoder.Builder().build();
  const gppString = new GPPStringEncoder.Builder().addSection(uspca).build();
  expect(gppString.encode2BitStr()).toBe(
    "0000110000010000000000010000011~0000010000000000000000000000000000000000000000"
  );
});

test("Create a default uspca section encoded", () => {
  const uspca = new UspcaSectionEncoder.Builder().build();
  const gppString = new GPPStringEncoder.Builder().addSection(uspca).build();
  expect(gppString.encode()).toBe("DBABBa~BAAAAAAA");
});

test("Create a default uspv1 section bit string encoded", () => {
  const uspv1 = new Uspv1SectionEncoder.Builder().build();
  const gppString = new GPPStringEncoder.Builder().addSection(uspv1).build();
  expect(gppString.encode2BitStr()).toBe("000011000001000000000001010011~1---");
});

test("Create a default uspv1 section encoded", () => {
  const uspv1 = new Uspv1SectionEncoder.Builder().build();
  const gppString = new GPPStringEncoder.Builder().addSection(uspv1).build();
  expect(gppString.encode()).toBe("DBABT~1---");
});

test("Create a default uspca & uspv1 section bit string encoded", () => {
  const uspca = new UspcaSectionEncoder.Builder().build();
  const uspv1 = new Uspv1SectionEncoder.Builder().build();
  const gppString = new GPPStringEncoder.Builder()
    .addSection(uspca)
    .addSection(uspv1)
    .build();
  expect(gppString.encode2BitStr()).toBe(
    "0000110000010000000000100100110011~0000010000000000000000000000000000000000000000~1---"
  );
});

test("Create a default uspca & uspv1 section encoded", () => {
  const uspca = new UspcaSectionEncoder.Builder().build();
  const uspv1 = new Uspv1SectionEncoder.Builder().build();
  const gppString = new GPPStringEncoder.Builder()
    .addSection(uspca)
    .addSection(uspv1)
    .build();
  expect(gppString.encode()).toBe("DBACTM~BAAAAAAA~1---");
});

test("Create a uspca (1YNN) & uspv1 section encoded", () => {
  const uspca = new UspcaSectionEncoder.Builder().build();
  const uspv1 = new Uspv1SectionEncoder.Builder()
    .setNoticeOptOut(Uspv1Values.YES)
    .setSaleOptOut(Uspv1Values.NO)
    .setLspaCoveredTransaction(Uspv1Values.NO)
    .build();
  const gppString = new GPPStringEncoder.Builder()
    .addSection(uspca)
    .addSection(uspv1)
    .build();
  expect(gppString.encode()).toBe("DBACTM~BAAAAAAA~1YNN");
});
