import { GPPHeaderEncoder } from "./gpp-header";
import { Section } from "./section";

class GPPStringEncoder {
  #sections: Map<number, Section> = new Map();

  static Builder = class {
    #sections: Map<number, Section> = new Map();

    addSection(section: Section) {
      this.#sections.set(section.getGPPSectionID(), section);
      return this;
    }

    build() {
      return new GPPStringEncoder(this.#sections);
    }
  };

  constructor(sections: Map<number, Section>) {
    this.#sections = sections;
  }

  encode2BitStr() {
    let encodedString = "";
    if (this.#sections.size === 0) {
      throw "You need to add sections to be able to build the GPP string";
    }
    const sortedSections = this.#sortSections();
    const encodedHeader = new GPPHeaderEncoder(
      Array.from(sortedSections.keys())
    );
    encodedString += encodedHeader.encode2BitStr();

    for (const [, value] of this.#sections) {
      encodedString += "~" + value.encode2BitStr();
    }
    return encodedString;
  }

  encode() {
    let encodedString = "";
    if (this.#sections.size === 0) {
      throw "You need to add sections to be able to build the GPP string";
    }
    const sortedSections = this.#sortSections();
    const encodedHeader = new GPPHeaderEncoder(
      Array.from(sortedSections.keys())
    );
    encodedString += encodedHeader.encode();

    for (const [, value] of this.#sections) {
      encodedString += "~" + value.encode();
    }
    return encodedString;
  }

  toString() {
    return this.encode2BitStr();
  }

  #sortSections() {
    return new Map(
      [...this.#sections].sort(
        (a: [number, Section], b: [number, Section]) => a[0] - b[0]
      )
    );
  }
}

export { GPPStringEncoder };
