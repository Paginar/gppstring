//const t = require("./");
import GPPString from "./gpp_str";
import UspcaSection from "../src/sections/us-states/ca/uspca";

test.skip("Create an empty gpp string, must throw", () => {
  let gppString = new GPPString.Builder().build();

  expect(() => {
    gppString.encode();
  }).toThrow();
});

// test.skip("Create a default uspca section", () => {
//   let uspca = new UspcaSection.Builder().build();
//   let gppString = new GPPString.Builder().adduspcaSection(uspca).build();

//   expect(gppString.encode()).toBe("0000000000000000000000000000000000000000");
// });
