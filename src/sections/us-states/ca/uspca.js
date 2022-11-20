// eslint-disable-next-line max-classes-per-file
import { IntegerFixedLength, NBitfield } from "../../../core/data-types";

class UspcaSection {
  gppSectionID = 8;
  clientSideAPIPrefix = "uspca";
  version = new IntegerFixedLength.Builder().setLength(6).setValue(1).build();
  #saleOptOutNotice = null;
  #sharingOptOutNotice = null;
  #sensitiveDataLimitUseNotice = null;
  #saleOptOut = null;
  #sharingOptOut = null;
  #sensitiveDataProcessing = null;
  #knownChildSensitiveDataConsents = null;
  #personalDataConsents = null;
  #mspaCoveredTransaction = null;
  #mspaOptOutOptionMode = null;
  #mspaServiceProviderMode = null;

  static Builder = class {
    #saleOptOutNotice = new IntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #sharingOptOutNotice = new IntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #sensitiveDataLimitUseNotice = new IntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #saleOptOut = new IntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #sharingOptOut = new IntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #sensitiveDataProcessing = new NBitfield.Builder()
      .setNbitSize(2)
      .setNumBits(9)
      .setNBit(1, 0)
      .setNBit(2, 0)
      .setNBit(3, 0)
      .setNBit(4, 0)
      .setNBit(5, 0)
      .setNBit(6, 0)
      .setNBit(7, 0)
      .setNBit(8, 0)
      .setNBit(9, 0)
      .build();
    #knownChildSensitiveDataConsents = new NBitfield.Builder()
      .setNbitSize(2)
      .setNumBits(2)
      .setNBit(1, 0)
      .setNBit(2, 0)
      .build();
    #personalDataConsents = new IntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #mspaCoveredTransaction = new IntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #mspaOptOutOptionMode = new IntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #mspaServiceProviderMode = new IntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();

    setSaleOptOutNotice(saleOptOutNotice) {
      if (saleOptOutNotice < 0 && saleOptOutNotice >= 2) {
        throw `param value ${saleOptOutNotice} of setSaleOptOutNotice method must be a non-negative integer between 0 and 2`;
      }
      this.#saleOptOutNotice = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(saleOptOutNotice)
        .build();
      return this;
    }

    setSharingOptOutNotice(sharingOptOutNotice) {
      if (sharingOptOutNotice < 0 && sharingOptOutNotice > 2) {
        throw `param value ${sharingOptOutNotice} of setSharingOptOutNotice method must be a non-negative integer between 0 and 2`;
      }
      this.#sharingOptOutNotice = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(sharingOptOutNotice)
        .build();
      return this;
    }

    setSensitiveDataLimitUseNotice(sensitiveDataLimitUseNotice) {
      if (sensitiveDataLimitUseNotice < 0 && sensitiveDataLimitUseNotice > 2) {
        throw `param value ${sensitiveDataLimitUseNotice} of setSensitiveDataLimitUseNotice method must be a non-negative integer between 0 and 2`;
      }
      this.#sensitiveDataLimitUseNotice = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(sensitiveDataLimitUseNotice)
        .build();

      return this;
    }

    setSaleOptOut(saleOptOut) {
      if (saleOptOut < 0 && saleOptOut > 2) {
        throw `param value ${saleOptOut} of setSaleOptOut method must be a non-negative integer between 0 and 2`;
      }
      this.#saleOptOut = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(saleOptOut)
        .build();
      return this;
    }

    setSharingOptOut(sharingOptOut) {
      if (sharingOptOut < 0 && sharingOptOut > 2) {
        throw `param value ${sharingOptOut} of setSharingOptOut method must be a non-negative integer between 0 and 2`;
      }
      this.#sharingOptOut = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(sharingOptOut)
        .build();
      return this;
    }

    setSensitiveDataProcessing(sensitiveDataProcessing) {
      if (
        Array.isArray(sensitiveDataProcessing) &&
        sensitiveDataProcessing.length === 9
      ) {
        throw `param value ${sensitiveDataProcessing} of section in setSensitiveDataProcessing method must be an Array of length 9`;
      }
      const nbitfield = new NBitfield.Builder().setNbitSize(2).setNumBits(9);

      for (let n = 1; n <= sensitiveDataProcessing.length; n++) {
        const bitValue = sensitiveDataProcessing[n];
        if (bitValue < 0 && bitValue > 2) {
          throw `Check Array values. Index ${n} of Array must be a non-negative integer between 0 and 2 in setSensitiveDataProcessing method`;
        }
        nbitfield.setNBit(n, bitValue);
      }
      this.#sensitiveDataProcessing = nbitfield.build();
      return this;
    }

    setKnownChildSensitiveDataConsents(knownChildSensitiveDataConsents) {
      if (
        Array.isArray(knownChildSensitiveDataConsents) &&
        knownChildSensitiveDataConsents.length === 2
      ) {
        throw `param value ${knownChildSensitiveDataConsents} of section in setKnownChildSensitiveDataConsents method must be an Array of length 2`;
      }
      const nbitfield = new NBitfield.Build()
        .setNbitSize(2)
        .setNumBits(knownChildSensitiveDataConsents.length);
      for (let n = 1; n <= knownChildSensitiveDataConsents.length; n++) {
        const bitValue = knownChildSensitiveDataConsents[n];
        if (bitValue < 0 && bitValue > 2) {
          throw `Check Array values. Index ${n} of Array must be a non-negative integer between 0 and 2 in setKnownChildSensitiveDataConsents`;
        }
        nbitfield.setNBit(n, bitValue);
      }
      this.#knownChildSensitiveDataConsents = nbitfield.build();
      return this;
    }

    setPersonalDataConsents(personalDataConsents) {
      if (personalDataConsents < 0 && personalDataConsents > 2) {
        throw `param value ${sharingOptOut} of setPersonalDataConsents method must be a non-negative integer between 0 and 2`;
      }
      this.#personalDataConsents = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(personalDataConsents)
        .build();
      return this;
    }

    setMspaCoveredTransaction(mspaCoveredTransaction) {
      if (mspaCoveredTransaction < 0 && mspaCoveredTransaction > 2) {
        throw `param value ${mspaCoveredTransaction} of setMspaCoveredTransaction method must be a non-negative integer between 0 and 2`;
      }
      this.#mspaCoveredTransaction = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(mspaCoveredTransaction)
        .build();
      return this;
    }

    setMspaOptOutOptionMode(mspaOptOutOptionMode) {
      if (mspaOptOutOptionMode < 0 && mspaOptOutOptionMode > 2) {
        throw `param value ${sharingOptOut} of setMspaOptOutOptionMode method must be a non-negative integer between 0 and 2`;
      }
      this.#mspaOptOutOptionMode = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(mspaOptOutOptionMode)
        .build();
      return this;
    }

    setMspaServiceProviderMode(mspaServiceProviderMode) {
      if (mspaServiceProviderMode < 0 && mspaServiceProviderMode > 2) {
        throw `param value ${sharingOptOut} of setMspaServiceProviderMode method must be a non-negative integer between 0 and 2`;
      }
      this.#mspaServiceProviderMode = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(mspaServiceProviderMode)
        .build();
      return this;
    }

    build() {
      const gppString = new UspcaSection(
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
    let bitStr = "";
    bitStr += this.version.encode();
    bitStr += this.#saleOptOutNotice.encode();
    bitStr += this.#sharingOptOutNotice.encode();
    bitStr += this.#sensitiveDataLimitUseNotice.encode();
    bitStr += this.#saleOptOut.encode();
    bitStr += this.#sharingOptOut.encode();
    bitStr += this.#sensitiveDataProcessing.encode();
    bitStr += this.#knownChildSensitiveDataConsents.encode();
    bitStr += this.#personalDataConsents.encode();
    bitStr += this.#mspaCoveredTransaction.encode();
    bitStr += this.#mspaOptOutOptionMode.encode();
    bitStr += this.#mspaServiceProviderMode.encode();
    // const b64 = Buffer.from(bitStr, "base64url");
    return bitStr;
  }
}

export default UspcaSection;