// eslint-disable-next-line max-classes-per-file
import { Boolean, IntegerFixedLength, RangeFibonacci, NBitfield } from '../../../core/data-types';

class UspcaSection {
  #prefix = 'uspca'

  #section_id = 8

  #saleOptOutNotice = 'Y';

  #sharingOptOutNotice = 'Y';

  #sensitiveDataLimitUseNotice = 'Y';

  #saleOptOut = 'Y';

  #sharingOptOut = 'Y';

  #sensitiveDataProcessing = 'Y';

  #knownChildSensitiveDataConsents = 'Y';

  #personalDataConsents = 'Y';

  #mspaCoveredTransaction = 'Y';

  #mspaOptOutOptionMode = 'Y';

  #mspaServiceProviderMode = 'Y';

  static Builder = class {
    #prefix = 'uspca'

    #version = '1';

    #saleOptOutNotice = 'Y';

    #sharingOptOutNotice = 'Y';

    #sensitiveDataLimitUseNotice = 'Y';

    #saleOptOut = 'Y';

    #sharingOptOut = 'Y';

    #sensitiveDataProcessing = 'Y';

    #knownChildSensitiveDataConsents = 'Y';

    #personalDataConsents = 'Y';

    #mspaCoveredTransaction = 'Y';

    #mspaOptOutOptionMode = 'Y';

    #mspaServiceProviderMode = 'Y';

    setVersion(version) {

        this.#version = new IntegerFixedLength().Builder().setLength(6).setValue(version).build()

        return this
    }

    setSaleOptOutNotice(saleOptOutNotice) {
        if (saleOptOutNotice >= 0 && saleOptOutNotice <= 2) {
            throw `param value ${saleOptOutNotice} of ${this.#prefix} setSaleOptOutNotice method must be a non-negative integer between 0 and 2`;
        }

      this.#saleOptOutNotice = new IntegerFixedLength().Builder().setLength(2).setValue(saleOptOutNotice).build();

      return this;
    }

    setSharingOptOutNotice(sharingOptOutNotice) {
        if (sharingOptOutNotice >= 0 && sharingOptOutNotice <= 2) {
            throw `param value ${sharingOptOutNotice} of ${this.#prefix} setSharingOptOutNotice method must be a non-negative integer between 0 and 2`;
        }
        
      this.#sharingOptOutNotice = new IntegerFixedLength().Builder().setLength(2).setValue(sharingOptOutNotice).build();;

      return this;
    }

    setSensitiveDataLimitUseNotice(sensitiveDataLimitUseNotice) {
        if (sensitiveDataLimitUseNotice >= 0 && sensitiveDataLimitUseNotice <= 2) {
            throw `param value ${sensitiveDataLimitUseNotice} of ${this.#prefix} setSensitiveDataLimitUseNotice method must be a non-negative integer between 0 and 2`;
        }
      this.#sensitiveDataLimitUseNotice = new IntegerFixedLength().Builder().setLength(2).setValue(sensitiveDataLimitUseNotice).build();

      return this;
    }

    setSaleOptOut(saleOptOut) {
        if (saleOptOut >= 0 && saleOptOut <= 2) {
            throw `param value ${saleOptOut} of ${this.#prefix} setSaleOptOut method must be a non-negative integer between 0 and 2`;
        }

      this.#saleOptOut = new IntegerFixedLength().Builder().setLength(2).setValue(saleOptOut).build();;

      return this;
    }

    setSharingOptOut(sharingOptOut) {
        if (sharingOptOut >= 0 && sharingOptOut <= 2) {
            throw `param value ${sharingOptOut} of ${this.#prefix} setSharingOptOut method must be a non-negative integer between 0 and 2`;
        }

      this.#sharingOptOut = new IntegerFixedLength().Builder().setLength(2).setValue(sharingOptOut).build();;

      return this;
    }

    setSensitiveDataProcessing(sensitiveDataProcessing) {
        if(Array.isArray(sensitiveDataProcessing) && sensitiveDataProcessing.length === 9) {
            throw `param value ${sensitiveDataProcessing} of ${this.#prefix} section in setSensitiveDataProcessing method must be an Array of length 9`;
        }

        const nbitfield = new NBitfield(sensitiveDataProcessing).Build().setNbitSize(2).setNumBits(sensitiveDataProcessing.length)

        for (let n = 0; n < sensitiveDataProcessing.length; n++) {
            const bitValue = sensitiveDataProcessing[n];
            if (bitValue >= 0 && bitValue <= 2) {
                throw `Check Array values. Index ${n} of Array must be a non-negative integer between 0 and 2 in setSensitiveDataProcessing method of ${this.#prefix} section`;
            }
            nbitfield.setNBit(n, bitValue)
        }

      this.#sensitiveDataProcessing = nbitfield;

      return this;
    }

    setKnownChildSensitiveDataConsents(knownChildSensitiveDataConsents) {
        if(Array.isArray(knownChildSensitiveDataConsents) && knownChildSensitiveDataConsents.length === 2) {
            throw `param value ${knownChildSensitiveDataConsents} of ${this.#prefix} section in setKnownChildSensitiveDataConsents method must be an Array of length 2`;
        }

        const nbitfield = new NBitfield(knownChildSensitiveDataConsents).Build().setNbitSize(2).setNumBits(knownChildSensitiveDataConsents.length)

        for (let n = 0; n < knownChildSensitiveDataConsents.length; n++) {
            const bitValue = knownChildSensitiveDataConsents[n];
            if (bitValue >= 0 && bitValue <= 2) {
                throw `Check Array values. Index ${n} of Array must be a non-negative integer between 0 and 2 in setKnownChildSensitiveDataConsents method of ${this.#prefix} section`;
            }
            nbitfield.setNBit(n, bitValue)
        }
      this.#knownChildSensitiveDataConsents = nbitfield;

      return this;
    }

    setPersonalDataConsents(personalDataConsents) {
    if (personalDataConsents >= 0 && personalDataConsents <= 2) {
            throw `param value ${sharingOptOut} of ${this.#prefix} setPersonalDataConsents method must be a non-negative integer between 0 and 2`;
    }

      this.#personalDataConsents = new IntegerFixedLength().Builder().setLength(2).setValue(personalDataConsents).build();;

      return this;
    }

    setMspaCoveredTransaction(mspaCoveredTransaction) {
        if (mspaCoveredTransaction >= 0 && mspaCoveredTransaction <= 2) {
            throw `param value ${mspaCoveredTransaction} of ${this.#prefix} setMspaCoveredTransaction method must be a non-negative integer between 0 and 2`;
    }

      this.#mspaCoveredTransaction = new IntegerFixedLength().Builder().setLength(2).setValue(mspaCoveredTransaction).build();;


      return this;
    }

    setMspaOptOutOptionMode(mspaOptOutOptionMode) {
        if (mspaOptOutOptionMode >= 0 && mspaOptOutOptionMode <= 2) {
            throw `param value ${sharingOptOut} of ${this.#prefix} setMspaOptOutOptionMode method must be a non-negative integer between 0 and 2`;
    }

      this.#mspaOptOutOptionMode = new IntegerFixedLength().Builder().setLength(2).setValue(mspaOptOutOptionMode).build();;


      return this;
    }

    setMspaServiceProviderMode(mspaServiceProviderMode) {
        if (mspaServiceProviderMode >= 0 && mspaServiceProviderMode <= 2) {
            throw `param value ${sharingOptOut} of ${this.#prefix} setMspaServiceProviderMode method must be a non-negative integer between 0 and 2`;
    }

      this.#mspaServiceProviderMode = new IntegerFixedLength().Builder().setLength(2).setValue(mspaServiceProviderMode).build();;


      return this;
    }

    build() {
      const gppString = new UspcaSection(
        this.#version,
        this.#saleOptOutNotice,
        this.#sharingOptOutNotice,
        this.#sensitiveDataLimitUseNotice,
        this.#saleOptOut,
        this.#sharingOptOut,
        this.#sensitiveDataProcessing,
        this.#knownChildSensitiveDataConsents,
        this.#personalDataConsents,
        this.#mspaCoveredTransaction,
        this.#mspaOptOutOptionMode,
        this.#mspaServiceProviderMode
      );
      return gppString;
    }
  };

  constructor(
    version,
    saleOptOutNotice,
    sharingOptOutNotice,
    sensitiveDataLimitUseNotice,
    saleOptOut,
    sharingOptOut,
    sensitiveDataProcessing,
    knownChildSensitiveDataConsents,
    personalDataConsents,
    mspaCoveredTransaction,
    mspaOptOutOptionMode,
    mspaServiceProviderMode
  ) {
    this.#version = version;
    this.#saleOptOutNotice = saleOptOutNotice;
    this.#sharingOptOutNotice = sharingOptOutNotice;
    this.#sensitiveDataLimitUseNotice = sensitiveDataLimitUseNotice;
    this.#saleOptOut = saleOptOut;
    this.#sharingOptOut = sharingOptOut;
    this.#sensitiveDataProcessing = sensitiveDataProcessing;
    this.#knownChildSensitiveDataConsents = knownChildSensitiveDataConsents;
    this.#personalDataConsents = personalDataConsents;
    this.#mspaCoveredTransaction = mspaCoveredTransaction;
    this.#mspaOptOutOptionMode = mspaOptOutOptionMode;
    this.#mspaServiceProviderMode = mspaServiceProviderMode;
  }

  encode() {
    const bitStr = `
            ${this.#saleOptOutNotice.encode()}
            ${this.#sharingOptOutNotice.encode()}
            ${this.#sensitiveDataLimitUseNotice.encode()}
            ${this.#saleOptOut.encode()}
            ${this.#sharingOptOut.encode()}
            ${this.#sensitiveDataProcessing.encode()}
            ${this.#knownChildSensitiveDataConsents.encode()}
            ${this.#personalDataConsents.encode()}
            ${this.#mspaCoveredTransaction.encode()}
            ${this.#mspaOptOutOptionMode.encode()}
            ${this.#mspaServiceProviderMode.encode()}`;
    const b64 = btoa(bitStr);
    return b64;
  }
}

export default UspcaSection;
