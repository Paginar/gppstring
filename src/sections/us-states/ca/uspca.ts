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

  static Builder = class UspcaSectionEncoderBuilder {
    #saleOptOutNoticeBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0);
    #sharingOptOutNoticeBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0);
    #sensitiveDataLimitUseNoticeBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0);
    #saleOptOutBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0);
    #sharingOptOutBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0);
    #sensitiveDataProcessingBuilder = new GPPNBitfield.Builder()
      .setLength(9)
      .setBitSize(2)
      .setValues(Array(9).fill(0));
    #knownChildSensitiveDataConsentsBuilder = new GPPNBitfield.Builder()
      .setLength(2)
      .setBitSize(2)
      .setValues(Array(2).fill(0));
    #personalDataConsentsBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0);
    #mspaCoveredTransactionBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0);
    #mspaOptOutOptionModeBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0);
    #mspaServiceProviderModeBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0);

    setSaleOptOutNotice(value: number) {
      this.#validateValue(value);
      this.#saleOptOutNoticeBuilder.setValue(value);
      return this;
    }

    setSharingOptOutNotice(value: number) {
      this.#validateValue(value);
      this.#sharingOptOutNoticeBuilder.setValue(value);
      return this;
    }

    setSensitiveDataLimitUseNotice(value: number) {
      this.#validateValue(value);
      this.#sensitiveDataLimitUseNoticeBuilder.setValue(value);
      return this;
    }

    setSaleOptOut(value: number) {
      this.#validateValue(value);
      this.#saleOptOutBuilder.setValue(value);
      return this;
    }

    setSharingOptOut(value: number) {
      this.#validateValue(value);
      this.#sharingOptOutBuilder.setValue(value);
      return this;
    }

    setSensitiveDataProcessing(values: number[]) {
      this.#sensitiveDataProcessingBuilder.setValues(values);
      return this;
    }

    setKnownChildSensitiveDataConsents(values: number[]) {
      this.#knownChildSensitiveDataConsentsBuilder.setValues(values);
      return this;
    }

    setPersonalDataConsents(value: number) {
      this.#validateValue(value);
      this.#personalDataConsentsBuilder.setValue(value);
      return this;
    }

    setMspaCoveredTransaction(value: number) {
      this.#validateValue(value);
      this.#mspaCoveredTransactionBuilder.setValue(value);
      return this;
    }

    setMspaOptOutOptionMode(value: number) {
      this.#validateValue(value);
      this.#mspaOptOutOptionModeBuilder.setValue(value);

      return this;
    }

    setMspaServiceProviderMode(value: number) {
      this.#validateValue(value);
      this.#mspaServiceProviderModeBuilder.setValue(value);

      return this;
    }

    #validateValue(value: number) {
      if (value < 0 || value > 2) {
        throw `param value must be a non-negative integer between 0 and 2`;
      }
    }

    build() {
      const gppString = new UspcaSectionEncoder(
        this.#saleOptOutNoticeBuilder.build(),
        this.#sharingOptOutNoticeBuilder.build(),
        this.#sensitiveDataLimitUseNoticeBuilder.build(),
        this.#saleOptOutBuilder.build(),
        this.#sharingOptOutBuilder.build(),
        this.#sensitiveDataProcessingBuilder.build(),
        this.#knownChildSensitiveDataConsentsBuilder.build(),
        this.#personalDataConsentsBuilder.build(),
        this.#mspaCoveredTransactionBuilder.build(),
        this.#mspaOptOutOptionModeBuilder.build(),
        this.#mspaServiceProviderModeBuilder.build()
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
