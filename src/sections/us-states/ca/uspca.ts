// eslint-disable-next-line max-classes-per-file
import { IntegerFixedLength, NBitfield } from "../../../core/data-types";
import { encodeBitStr2Base64Websafe } from "../../../core//utils";
import { Section } from "../../../core/section";
class UspcaSection implements Section {
  #gppSectionID = 8;
  #clientSideAPIPrefix = "uspca";
  #version = new IntegerFixedLength.Builder().setLength(6).setValue(1).build();
  #saleOptOutNotice: IntegerFixedLength;
  #sharingOptOutNotice: IntegerFixedLength;
  #sensitiveDataLimitUseNotice: IntegerFixedLength;
  #saleOptOut: IntegerFixedLength;
  #sharingOptOut: IntegerFixedLength;
  #sensitiveDataProcessing: NBitfield;
  #knownChildSensitiveDataConsents: NBitfield;
  #personalDataConsents: IntegerFixedLength;
  #mspaCoveredTransaction: IntegerFixedLength;
  #mspaOptOutOptionMode: IntegerFixedLength;
  #mspaServiceProviderMode: IntegerFixedLength;

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

    setSaleOptOutNotice(saleOptOutNotice: number) {
      if (saleOptOutNotice < 0 || saleOptOutNotice > 2) {
        throw `param value ${saleOptOutNotice} of setSaleOptOutNotice method must be a non-negative integer between 0 and 2`;
      }
      this.#saleOptOutNotice = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(saleOptOutNotice)
        .build();
      return this;
    }

    setSharingOptOutNotice(sharingOptOutNotice: number) {
      if (sharingOptOutNotice < 0 || sharingOptOutNotice > 2) {
        throw `param value ${sharingOptOutNotice} of setSharingOptOutNotice method must be a non-negative integer between 0 and 2`;
      }
      this.#sharingOptOutNotice = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(sharingOptOutNotice)
        .build();
      return this;
    }

    setSensitiveDataLimitUseNotice(sensitiveDataLimitUseNotice: number) {
      if (sensitiveDataLimitUseNotice < 0 || sensitiveDataLimitUseNotice > 2) {
        throw `param value ${sensitiveDataLimitUseNotice} of setSensitiveDataLimitUseNotice method must be a non-negative integer between 0 and 2`;
      }
      this.#sensitiveDataLimitUseNotice = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(sensitiveDataLimitUseNotice)
        .build();
      return this;
    }

    setSaleOptOut(saleOptOut: number) {
      if (saleOptOut < 0 || saleOptOut > 2) {
        throw `param value ${saleOptOut} of setSaleOptOut method must be a non-negative integer between 0 and 2`;
      }
      this.#saleOptOut = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(saleOptOut)
        .build();
      return this;
    }

    setSharingOptOut(sharingOptOut: number) {
      if (sharingOptOut < 0 || sharingOptOut > 2) {
        throw `param value ${sharingOptOut} of setSharingOptOut method must be a non-negative integer between 0 and 2`;
      }
      this.#sharingOptOut = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(sharingOptOut)
        .build();
      return this;
    }

    setSensitiveDataProcessing(sensitiveDataProcessing: number) {
      if (
        !Array.isArray(sensitiveDataProcessing) ||
        sensitiveDataProcessing.length !== 9
      ) {
        throw `param in setSensitiveDataProcessing method must be an Array of length 9`;
      }
      const nbitfield = new NBitfield.Builder().setNbitSize(2).setNumBits(9);

      for (let n = 0; n < 9; n++) {
        const bitValue = sensitiveDataProcessing[n];
        nbitfield.setNBit(n + 1, bitValue);
      }
      this.#sensitiveDataProcessing = nbitfield.build();
      return this;
    }

    setKnownChildSensitiveDataConsents(
      knownChildSensitiveDataConsents: number
    ) {
      if (
        !Array.isArray(knownChildSensitiveDataConsents) ||
        knownChildSensitiveDataConsents.length !== 2
      ) {
        throw `param value ${knownChildSensitiveDataConsents} of section in setKnownChildSensitiveDataConsents method must be an Array of length 2`;
      }
      const nbitfield = new NBitfield.Builder().setNbitSize(2).setNumBits(2);
      for (let n = 0; n < 2; n++) {
        const bitValue = knownChildSensitiveDataConsents[n];
        nbitfield.setNBit(n + 1, bitValue);
      }
      this.#knownChildSensitiveDataConsents = nbitfield.build();
      return this;
    }

    setPersonalDataConsents(personalDataConsents: number) {
      if (personalDataConsents < 0 || personalDataConsents > 2) {
        throw `param value ${personalDataConsents} of setPersonalDataConsents method must be a non-negative integer between 0 and 2`;
      }
      this.#personalDataConsents = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(personalDataConsents)
        .build();
      return this;
    }

    setMspaCoveredTransaction(mspaCoveredTransaction: number) {
      if (mspaCoveredTransaction < 0 || mspaCoveredTransaction > 2) {
        throw `param value ${mspaCoveredTransaction} of setMspaCoveredTransaction method must be a non-negative integer between 0 and 2`;
      }
      this.#mspaCoveredTransaction = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(mspaCoveredTransaction)
        .build();
      return this;
    }

    setMspaOptOutOptionMode(mspaOptOutOptionMode: number) {
      if (mspaOptOutOptionMode < 0 || mspaOptOutOptionMode > 2) {
        throw `param value ${mspaOptOutOptionMode} of setMspaOptOutOptionMode method must be a non-negative integer between 0 and 2`;
      }
      this.#mspaOptOutOptionMode = new IntegerFixedLength.Builder()
        .setLength(2)
        .setValue(mspaOptOutOptionMode)
        .build();
      return this;
    }

    setMspaServiceProviderMode(mspaServiceProviderMode: number) {
      if (mspaServiceProviderMode < 0 || mspaServiceProviderMode > 2) {
        throw `param value ${mspaServiceProviderMode} of setMspaServiceProviderMode method must be a non-negative integer between 0 and 2`;
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
    saleOptOutNotice: IntegerFixedLength,
    sharingOptOutNotice: IntegerFixedLength,
    sensitiveDataLimitUseNotice: IntegerFixedLength,
    saleOptOut: IntegerFixedLength,
    sharingOptOut: IntegerFixedLength,
    sensitiveDataProcessing: NBitfield,
    knownChildSensitiveDataConsents: NBitfield,
    personalDataConsents: IntegerFixedLength,
    mspaCoveredTransaction: IntegerFixedLength,
    mspaOptOutOptionMode: IntegerFixedLength,
    mspaServiceProviderMode: IntegerFixedLength
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

  encode2BitStr() {
    let bitStr = "";
    bitStr += this.#version.encode2BitStr();
    bitStr += this.#saleOptOutNotice.encode2BitStr();
    bitStr += this.#sharingOptOutNotice.encode2BitStr();
    bitStr += this.#sensitiveDataLimitUseNotice.encode2BitStr();
    bitStr += this.#saleOptOut.encode2BitStr();
    bitStr += this.#sharingOptOut.encode2BitStr();
    bitStr += this.#sensitiveDataProcessing.encode2BitStr();
    bitStr += this.#knownChildSensitiveDataConsents.encode2BitStr();
    bitStr += this.#personalDataConsents.encode2BitStr();
    bitStr += this.#mspaCoveredTransaction.encode2BitStr();
    bitStr += this.#mspaOptOutOptionMode.encode2BitStr();
    bitStr += this.#mspaServiceProviderMode.encode2BitStr();
    return bitStr;
  }

  encode(): string {
    return encodeBitStr2Base64Websafe(this.encode2BitStr());
  }

  getGPPSectionID() {
    return this.#gppSectionID;
  }

  getClientSideAPIPrefix() {
    return this.#clientSideAPIPrefix;
  }
}

export { UspcaSection };
