// eslint-disable-next-line max-classes-per-file
import {
  Boolean,
  IntegerFixedLength,
  RangeFibonacci,
  NBitfield,
} from "../../../core/data-types";

class UspnatSection {
  #prefix = "uspnat";

  #lspa = "Y";

  #section_id = 7;

  #version = "1";

  #sharingNotice = "Y";

  #saleOptOutNotice = "Y";

  #sharingOptOutNotice = "Y";

  #targetedAdvertisingOptOutNotice = "Y";

  #sensitiveDataProcessingOptOutNotice = "Y";

  #sensitiveDataLimitUseNotice = "Y";

  #saleOptOut = "Y";

  #sharingOptOut = "Y";

  #targetedAdvertisingOptOut = "Y";

  #sensitiveDataProcessing = "Y";

  #knownChildSensitiveDataConsents = "Y";

  #personalDataConsents = "Y";

  #mspaCoveredTransaction = "Y";

  #mspaOptOutOptionMode = "Y";

  #mspaServiceProviderMode = "Y";

  static Builder = class {
    #prefix = "uspnat";

    #lspa = "Y";

    #section_id = 7;

    #version = "1";

    #sharingNotice = "Y";

    #saleOptOutNotice = "Y";

    #sharingOptOutNotice = "Y";

    #targetedAdvertisingOptOutNotice = "Y";

    #sensitiveDataProcessingOptOutNotice = "Y";

    #sensitiveDataLimitUseNotice = "Y";

    #saleOptOut = "Y";

    #sharingOptOut = "Y";

    #targetedAdvertisingOptOut = "Y";

    #sensitiveDataProcessing = "Y";

    #knownChildSensitiveDataConsents = "Y";

    #personalDataConsents = "Y";

    #mspaCoveredTransaction = "Y";

    #mspaOptOutOptionMode = "Y";

    #mspaServiceProviderMode = "Y";

    setVersion(version) {
      this.#version = version;

      return this;
    }

    setSaleOptOutNotice(saleOptOutNotice) {
      if (saleOptOutNotice >= 0 && saleOptOutNotice <= 2) {
        throw `param value ${saleOptOutNotice} of ${
          this.#prefix
        } setSaleOptOutNotice method must be a non-negative integer between 0 and 2`;
      }

      this.#saleOptOutNotice = saleOptOutNotice;

      return this;
    }

    setSaleOptOut(saleOptOut) {
      if (saleOptOut >= 0 && saleOptOut <= 2) {
        throw `param value ${saleOptOut} of ${
          this.#prefix
        } setSaleOptOut method must be a non-negative integer between 0 and 2`;
      }

      this.#saleOptOut = saleOptOut;

      return this;
    }

    setLspa(lspa) {
      if (lspa >= 0 && lspa <= 2) {
        throw `param value ${lspa} of ${
          this.#prefix
        } setLspa method must be a non-negative integer between 0 and 2`;
      }

      this.#lspa = lspa;

      return this;
    }

    build() {
      const gppString = new UspnatSection(
        this.#version,
        this.#saleOptOutNotice,
        this.#saleOptOut,
        this.#lspa
      );
      return gppString;
    }
  };

  constructor(version, saleOptOutNotice, saleOptOut, lspa) {
    this.#version = version;
    this.#saleOptOutNotice = saleOptOutNotice;
    this.#saleOptOut = saleOptOut;
    this.#lspa = lspa;
  }

  encode2BitStr() {
    const bitStr = `
    ${this.#version}
    ${this.#saleOptOutNotice}
    ${this.#saleOptOut}
    ${this.#lspa}`;
    const b64 = btoa(bitStr);

    //
    return b64 + "~" + bitStr;
  }
}

export { UspnatSection };
