//const t = require("./");
import GPPString from "./gpp-str";
import UspcaSection from "./sections/us-states/ca/uspca";

test("Create an empty gpp string, must throw", () => {
  expect(() => {
    let gppString = new GPPString.Builder().build();
    gppString.encode();
  }).toThrow();
});

test("Create a default uspca section", () => {
  let uspca = new UspcaSection.Builder().build();
  let gppString = new GPPString.Builder().adduspcaSection(uspca).build();
  expect(gppString.encode()).toBe(
    "0000110000010000000000010000011~0000010000000000000000000000000000000000000000"
  );
});
