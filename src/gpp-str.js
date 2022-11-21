import GPPHeader from "./gpp-header";
import { encode2BitStr2Base64Websafe } from "../src/core/utils";

const GPP_TYPE = 3;
const GPP_VERSION = 1;

class GPPString {
  #sections = new Map();

  static Builder = class {
    #sections = new Map();

    addSection(section) {
      this.#sections.set(section.gppSectionID, section);
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
    encodedString += encode2BitStr2Base64Websafe(encodedHeader.encode2BitStr());

    for (const [key, value] of this.#sections) {
      encodedString += "~" + encode2BitStr2Base64Websafe(value.encode2BitStr());
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
