// eslint-disable-next-line max-classes-per-file
import GppHeader from './gpp-header';
import { Boolean, IntegerFixedLength, RangeFibonacci, NBitfield } from './core/data-types'
import { GGP_TYPE, GGP_VERSION, GGP_SECTIONS } from './utils';

class GPPString {
  #ccpaSection = null;

  #cpraSection = null;

  static Builder = class {
    // the builder class will have the same attributes as
    // the parent
    #ccpaSection = null;

    #cpraSection = null;

    // there are four methods to set each of the four
    // attributes
    addCCPASection(ccpaSectionInst) {
      this.#ccpaSection = ccpaSectionInst;
      // each method returns the builder object itself
      // this allows for chaining of methods
      return this;
    }

    addCPRASection(cpraSectionInst) {
      this.#cpraSection = cpraSectionInst;
      // each method returns the builder object itself
      // this allows for chaining of methods
      return this;
    }

    // we call the build method
    // to give us the `GPPString` instance
    build() {
      const gppString = new GPPString(this.#ccpaSection, this.#cpraSection);
      return gppString;
    }
  };

  constructor(cpraSectionInst, ccpaSectionInst) {
    this.#ccpaSection = ccpaSectionInst;
    this.#cpraSection = cpraSectionInst;
  }

  encode() {
    const headerEncoded = new GppHeader(GGP_TYPE, GGP_VERSION, GGP_SECTIONS).encode();
    let ccpaSectionEncoded;
    let cpraSectionEncoded;
    // encode header
    // encode cada section
    if (this.#ccpaSection) {
      ccpaSectionEncoded = this.#ccpaSection.encode();
    }
    if (this.#cpraSection) {
      cpraSectionEncoded = this.#cpraSection.encode();
    }

    // devuelve un unico string
    return `${headerEncoded}~${ccpaSectionEncoded}-${cpraSectionEncoded}`;
  }

  toString() {
    return this.encode();
  }
}


export default GPPString;
