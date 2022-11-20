import GPPHeader from "./gpp-header";
import { encodeBitStr2Base64Websafe } from "../src/core/utils";

const GPP_TYPE = 3;
const GPP_VERSION = 1;

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

  encode2BitStr() {
    let encodedString = "";
    if (this.#sections.size === 0) {
      throw "You need to add sections to be able to build the GPP string";
    }
    const sortedSections = this.#sortSections();
    const encodedHeader = new GPPHeader(Array.from(sortedSections.keys()));
    encodedString += encodedHeader.encode2BitStr();

    for (const [key, value] of this.#sections) {
      // console.log(`${key} = ${value}`);
      // console.log(`${value.encode2BitStr()}`);
      encodedString += "~" + value.encode2BitStr();
    }
    return encodedString;
  }

  encode2Base64Websafe() {
    let encodedString = "";
    if (this.#sections.size === 0) {
      throw "You need to add sections to be able to build the GPP string";
    }
    const sortedSections = this.#sortSections();
    const encodedHeader = new GPPHeader(Array.from(sortedSections.keys()));
    encodedString += encodeBitStr2Base64Websafe(encodedHeader.encode2BitStr());

    for (const [key, value] of this.#sections) {
      // console.log(`${key} = ${value}`);
      // console.log(`${value.encode2BitStr()}`);
      encodedString += "~" + encodeBitStr2Base64Websafe(value.encode2BitStr());
    }
    return encodedString;
  }

  toString() {
    return this.encode2BitStr();
  }

  #sortSections() {
    return new Map(
      [...this.#sections].sort((a, b) => String(a[0]).localeCompare(b[0]))
    );
  }
}

export default GPPString;
