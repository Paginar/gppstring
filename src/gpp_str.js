// eslint-disable-next-line max-classes-per-file
// import GppHeader from "./gpp-header";
import {
  Boolean,
  IntegerFixedLength,
  RangeFibonacci,
  NBitfield,
} from "./core/data-types";
// import { GGP_TYPE, GGP_VERSION, GGP_SECTIONS } from "./utils";
class GPPString {
  #sections = new Map();

  static Builder = class {
    #sections = new Map();

    adduspcaSection(uspcaSection) {
      this.#sections.set(uspcaSection.gppSectionID, uspcaSection);
      return this;
    }

    build() {
      return new GPPString(this.#sections);
    }
  };

  constructor(sections) {
    this.#sections = sections;
  }

  encode() {
    // const headerEncoded = new GppHeader(
    //   GGP_TYPE,
    //   GGP_VERSION,
    //   GGP_SECTIONS
    // ).encode();

    if (this.#sections.keys().length === 0) {
      throw "You need to add sections to be able to build the GPP string";
    }
    const sortedSections = this.#sortSections();
    // console.log(sortedSections);

    for (const [key, value] of this.#sections) {
      // console.log(`${key} = ${value}`);
      // console.log(`${value.encode()}`);
    }

    // return `${headerEncoded}~${ccpaSectionEncoded}-${cpraSectionEncoded}`;
  }

  toString() {
    return this.encode();
  }

  #sortSections() {
    return new Map(
      [...this.#sections].sort((a, b) => String(a[0]).localeCompare(b[0]))
    );
  }
}

export default GPPString;
