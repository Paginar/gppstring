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
  #sections: GPPRangeFibonacci;

  static Builder = class {
    #sectionsBuilder = new GPPRangeFibonacci.Builder();

    addSingleSection(value: number) {
      this.#sectionsBuilder.addSingle(value);
      return this;
    }

    addRangeSection(fromValue: number, toValue: number) {
      this.#sectionsBuilder.addGroup(fromValue, toValue);
      return this;
    }

    build() {
      return new GPPHeaderEncoder(this.#sectionsBuilder.build());
    }
  };

  constructor(sections: GPPRangeFibonacci) {
    this.#sections = sections;
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
