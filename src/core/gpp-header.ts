import { GPPIntegerFixedLength, GPPRangeFibonacci } from "./data-types";
import { encodeBitStr2Base64Websafe } from "./utils";
import { Section } from "./section";

const GPP_TYPE = 3;
const GPP_VERSION = 1;

class GPPHeaderEncoder implements Section {
  #gppSectionID = GPP_TYPE;
  #clientSideAPIPrefix = "gpp-header";
  #type = new GPPIntegerFixedLength.Builder()
    .setLength(6)
    .setValue(GPP_TYPE)
    .build();
  #version = new GPPIntegerFixedLength.Builder()
    .setLength(6)
    .setValue(GPP_VERSION)
    .build();
  #sections;

  constructor(sectionsIDArray: number[]) {
    if (!Array.isArray(sectionsIDArray) || sectionsIDArray.length === 0) {
      throw `sections must be an Array sections IDs of length > 0, for example: [2, 6]`;
    }
    const rangeFibonacci = new GPPRangeFibonacci.Builder();
    for (let n = 0; n < sectionsIDArray.length; n++) {
      rangeFibonacci.addSingle(sectionsIDArray[n]);
    }
    this.#sections = rangeFibonacci.build();
  }

  encode2BitStr() {
    let encodedString = "";
    encodedString += this.#type.encode2BitStr();
    encodedString += this.#version.encode2BitStr();
    encodedString += this.#sections.encode2BitStr();
    return encodedString;
  }

  encode() {
    return encodeBitStr2Base64Websafe(this.encode2BitStr());
  }
  getGPPSectionID() {
    return this.#gppSectionID;
  }

  getClientSideAPIPrefix() {
    return this.#clientSideAPIPrefix;
  }
}

export { GPPHeaderEncoder };
