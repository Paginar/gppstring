import { Section } from "../../../core/section";

export enum Uspv1Values {
  NA = "-",
  YES = "Y",
  NO = "N",
}

export class Uspv1SectionEncoder implements Section {
  #gppSectionID = 6;
  #clientSideAPIPrefix = "uspv1";
  #version = 1;
  #noticeOptOut: Uspv1Values = Uspv1Values.NA;
  #saleOptOut: Uspv1Values = Uspv1Values.NA;
  #lspaCoveredTransaction: Uspv1Values = Uspv1Values.NA;

  static Builder = class Uspv1SectionEncoderBuilder {
    #noticeOptOut: Uspv1Values = Uspv1Values.NA;
    #saleOptOut: Uspv1Values = Uspv1Values.NA;
    #lspaCoveredTransaction: Uspv1Values = Uspv1Values.NA;

    setNoticeOptOut(noticeOptOut: Uspv1Values) {
      if (!this.#validateUspv1Values(noticeOptOut)) {
        throw `Invalid value: noticeOptOut cannot be ${noticeOptOut}, it must be one of '-','Y','N'`;
      }
      this.#noticeOptOut = noticeOptOut;
      return this;
    }

    setSaleOptOut(saleOptOut: Uspv1Values) {
      if (!this.#validateUspv1Values(saleOptOut)) {
        throw `Invalid value: saleOptOut cannot be ${saleOptOut}, it must be one of '-','Y','N'`;
      }
      this.#saleOptOut = saleOptOut;
      return this;
    }

    setLspaCoveredTransaction(lspaCoveredTransaction: Uspv1Values) {
      if (!this.#validateUspv1Values(lspaCoveredTransaction)) {
        throw `Invalid value: lspaCoveredTransaction cannot be ${lspaCoveredTransaction}, it must be one of '-','Y','N'`;
      }
      this.#lspaCoveredTransaction = lspaCoveredTransaction;
      return this;
    }

    build() {
      const gppString = new Uspv1SectionEncoder(
        this.#noticeOptOut,
        this.#saleOptOut,
        this.#lspaCoveredTransaction
      );
      return gppString;
    }

    #validateUspv1Values(value: Uspv1Values) {
      return (
        value === Uspv1Values.NA ||
        value === Uspv1Values.YES ||
        value === Uspv1Values.NO
      );
    }
  };

  constructor(
    noticeOptOut: Uspv1Values,
    saleOptOut: Uspv1Values,
    lspaCoveredTransaction: Uspv1Values
  ) {
    this.#noticeOptOut = noticeOptOut;
    this.#saleOptOut = saleOptOut;
    this.#lspaCoveredTransaction = lspaCoveredTransaction;
  }

  encode2BitStr() {
    return this.encode();
  }

  encode() {
    let encodedString = "";
    encodedString += this.#version;
    encodedString += this.#noticeOptOut;
    encodedString += this.#saleOptOut;
    encodedString += this.#lspaCoveredTransaction;
    return encodedString;
  }

  getGPPSectionID() {
    return this.#gppSectionID;
  }

  getClientSideAPIPrefix() {
    return this.#clientSideAPIPrefix;
  }
}
