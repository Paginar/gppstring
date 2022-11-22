// eslint-disable-next-line max-classes-per-file
import { GPPIntegerFixedLength, GPPNBitfield } from "../../../core/data-types";
import { encodeBitStr2Base64Websafe } from "../../../core//utils";
import { Section } from "../../../core/section";
class UspcaSectionEncoder implements Section {
  #gppSectionID = 8;
  #clientSideAPIPrefix = "uspca";
  #version = new GPPIntegerFixedLength.Builder()
    .setLength(6)
    .setValue(1)
    .build();
  #saleOptOutNotice: GPPIntegerFixedLength;
  #sharingOptOutNotice: GPPIntegerFixedLength;
  #sensitiveDataLimitUseNotice: GPPIntegerFixedLength;
  #saleOptOut: GPPIntegerFixedLength;
  #sharingOptOut: GPPIntegerFixedLength;
  #sensitiveDataProcessing: GPPNBitfield;
  #knownChildSensitiveDataConsents: GPPNBitfield;
  #personalDataConsents: GPPIntegerFixedLength;
  #mspaCoveredTransaction: GPPIntegerFixedLength;
  #mspaOptOutOptionMode: GPPIntegerFixedLength;
  #mspaServiceProviderMode: GPPIntegerFixedLength;

  static Builder = class {
    #saleOptOutNotice = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #sharingOptOutNotice = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #sensitiveDataLimitUseNotice = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #saleOptOut = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #sharingOptOut = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #sensitiveDataProcessing = new GPPNBitfield.Builder()
      .setNBits(2, [0, 0, 0, 0, 0, 0, 0, 0, 0])
      .build();
    #knownChildSensitiveDataConsents = new GPPNBitfield.Builder()
      .setNBits(2, [0, 0])
      .build();
    #personalDataConsents = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #mspaCoveredTransaction = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #mspaOptOutOptionMode = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();
    #mspaServiceProviderMode = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0)
      .build();

    setSaleOptOutNotice(saleOptOutNotice: number) {
      if (saleOptOutNotice < 0 || saleOptOutNotice > 2) {
        throw `param value ${saleOptOutNotice} of setSaleOptOutNotice method must be a non-negative integer between 0 and 2`;
      }
      this.#saleOptOutNotice = new GPPIntegerFixedLength.Builder()
        .setLength(2)
        .setValue(saleOptOutNotice)
        .build();
      return this;
    }

    setSharingOptOutNotice(sharingOptOutNotice: number) {
      if (sharingOptOutNotice < 0 || sharingOptOutNotice > 2) {
        throw `param value ${sharingOptOutNotice} of setSharingOptOutNotice method must be a non-negative integer between 0 and 2`;
      }
      this.#sharingOptOutNotice = new GPPIntegerFixedLength.Builder()
        .setLength(2)
        .setValue(sharingOptOutNotice)
        .build();
      return this;
    }

    setSensitiveDataLimitUseNotice(sensitiveDataLimitUseNotice: number) {
      if (sensitiveDataLimitUseNotice < 0 || sensitiveDataLimitUseNotice > 2) {
        throw `param value ${sensitiveDataLimitUseNotice} of setSensitiveDataLimitUseNotice method must be a non-negative integer between 0 and 2`;
      }
      this.#sensitiveDataLimitUseNotice = new GPPIntegerFixedLength.Builder()
        .setLength(2)
        .setValue(sensitiveDataLimitUseNotice)
        .build();
      return this;
    }

    setSaleOptOut(saleOptOut: number) {
      if (saleOptOut < 0 || saleOptOut > 2) {
        throw `param value ${saleOptOut} of setSaleOptOut method must be a non-negative integer between 0 and 2`;
      }
      this.#saleOptOut = new GPPIntegerFixedLength.Builder()
        .setLength(2)
        .setValue(saleOptOut)
        .build();
      return this;
    }

    setSharingOptOut(sharingOptOut: number) {
      if (sharingOptOut < 0 || sharingOptOut > 2) {
        throw `param value ${sharingOptOut} of setSharingOptOut method must be a non-negative integer between 0 and 2`;
      }
      this.#sharingOptOut = new GPPIntegerFixedLength.Builder()
        .setLength(2)
        .setValue(sharingOptOut)
        .build();
      return this;
    }

    setSensitiveDataProcessing(sensitiveDataProcessing: number[]) {
      if (
        !Array.isArray(sensitiveDataProcessing) ||
        sensitiveDataProcessing.length !== 9
      ) {
        throw `param in setSensitiveDataProcessing method must be an Array of length 9`;
      }
      this.#sensitiveDataProcessing = new GPPNBitfield.Builder()
        .setNBits(2, sensitiveDataProcessing)
        .build();
      return this;
    }

    setKnownChildSensitiveDataConsents(
      knownChildSensitiveDataConsents: number[]
    ) {
      if (
        !Array.isArray(knownChildSensitiveDataConsents) ||
        knownChildSensitiveDataConsents.length !== 2
      ) {
        throw `param value ${knownChildSensitiveDataConsents} of section in setKnownChildSensitiveDataConsents method must be an Array of length 2`;
      }
      this.#knownChildSensitiveDataConsents = new GPPNBitfield.Builder()
        .setNBits(2, knownChildSensitiveDataConsents)
        .build();
      return this;
    }

    setPersonalDataConsents(personalDataConsents: number) {
      if (personalDataConsents < 0 || personalDataConsents > 2) {
        throw `param value ${personalDataConsents} of setPersonalDataConsents method must be a non-negative integer between 0 and 2`;
      }
      this.#personalDataConsents = new GPPIntegerFixedLength.Builder()
        .setLength(2)
        .setValue(personalDataConsents)
        .build();
      return this;
    }

    setMspaCoveredTransaction(mspaCoveredTransaction: number) {
      if (mspaCoveredTransaction < 0 || mspaCoveredTransaction > 2) {
        throw `param value ${mspaCoveredTransaction} of setMspaCoveredTransaction method must be a non-negative integer between 0 and 2`;
      }
      this.#mspaCoveredTransaction = new GPPIntegerFixedLength.Builder()
        .setLength(2)
        .setValue(mspaCoveredTransaction)
        .build();
      return this;
    }

    setMspaOptOutOptionMode(mspaOptOutOptionMode: number) {
      if (mspaOptOutOptionMode < 0 || mspaOptOutOptionMode > 2) {
        throw `param value ${mspaOptOutOptionMode} of setMspaOptOutOptionMode method must be a non-negative integer between 0 and 2`;
      }
      this.#mspaOptOutOptionMode = new GPPIntegerFixedLength.Builder()
        .setLength(2)
        .setValue(mspaOptOutOptionMode)
        .build();
      return this;
    }

    setMspaServiceProviderMode(mspaServiceProviderMode: number) {
      if (mspaServiceProviderMode < 0 || mspaServiceProviderMode > 2) {
        throw `param value ${mspaServiceProviderMode} of setMspaServiceProviderMode method must be a non-negative integer between 0 and 2`;
      }
      this.#mspaServiceProviderMode = new GPPIntegerFixedLength.Builder()
        .setLength(2)
        .setValue(mspaServiceProviderMode)
        .build();
      return this;
    }

    build() {
      const gppString = new UspcaSectionEncoder(
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
    saleOptOutNotice: GPPIntegerFixedLength,
    sharingOptOutNotice: GPPIntegerFixedLength,
    sensitiveDataLimitUseNotice: GPPIntegerFixedLength,
    saleOptOut: GPPIntegerFixedLength,
    sharingOptOut: GPPIntegerFixedLength,
    sensitiveDataProcessing: GPPNBitfield,
    knownChildSensitiveDataConsents: GPPNBitfield,
    personalDataConsents: GPPIntegerFixedLength,
    mspaCoveredTransaction: GPPIntegerFixedLength,
    mspaOptOutOptionMode: GPPIntegerFixedLength,
    mspaServiceProviderMode: GPPIntegerFixedLength
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

export { UspcaSectionEncoder };
