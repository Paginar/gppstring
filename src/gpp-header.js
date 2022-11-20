import { IntegerFixedLength, RangeFibonacci } from "./core/data-types";

class GPPHeader {
  #type = new IntegerFixedLength.Builder().setLength(6).setValue(3).build();
  #version = new IntegerFixedLength.Builder().setLength(6).setValue(1).build();
  #sections = null;

  constructor(sections) {
    if (!Array.isArray(sections) || sections.length === 0) {
      throw `sections must be an Array sections IDs of length > 0, for example: [2, 6]`;
    }
    const rangeFibonacci = new RangeFibonacci.Builder();
    for (let n = 0; n < sections.length; n++) {
      rangeFibonacci.addSingle(sections[n]);
    }
    this.#sections = rangeFibonacci.build();
  }

  encode() {
    let encodedString = "";
    encodedString += this.#type.encode();
    encodedString += this.#version.encode();
    encodedString += this.#sections.encode();
    return encodedString;
  }
}

export default GPPHeader;
