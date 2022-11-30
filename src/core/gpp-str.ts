import { GPPHeaderEncoder } from "./gpp-header";
import { Section } from "./section";

class GPPStringEncoder {
  #header: GPPHeaderEncoder;
  #sections: Map<number, Section> = new Map();

  static Builder = class GPPStringEncoderBuilder {
    #headerBuilder = new GPPHeaderEncoder.Builder();
    #sections: Map<number, Section> = new Map();

    addSingleSection(section: Section) {
      this.#headerBuilder.addSingleSection(section.getGPPSectionID());
      this.#sections.set(section.getGPPSectionID(), section);
      return this;
    }

    addRangeSection(sections: Section[]) {
      this.#headerBuilder.addRangeSection(
        sections[0].getGPPSectionID(),
        sections[sections.length - 1].getGPPSectionID()
      );
      for (const section of sections) {
        this.#sections.set(section.getGPPSectionID(), section);
      }
      return this;
    }

    build() {
      return new GPPStringEncoder(this.#headerBuilder.build(), this.#sections);
    }
  };

  constructor(header: GPPHeaderEncoder, sections: Map<number, Section>) {
    this.#header = header;
    this.#sections = sections;
  }

  encode2BitStr() {
    let encodedString = "";
    if (this.#sections.size === 0) {
      throw "You need to add sections to be able to build the GPP string";
    }
    encodedString += this.#header.encode2BitStr();
    const sortedSections = this.#sortSections();
    for (const [, value] of sortedSections) {
      encodedString += "~" + value.encode2BitStr();
    }
    return encodedString;
  }

  encode() {
    let encodedString = "";
    if (this.#sections.size === 0) {
      throw "You need to add sections to be able to build the GPP string";
    }
    encodedString += this.#header.encode();
    const sortedSections = this.#sortSections();
    for (const [, value] of sortedSections) {
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
