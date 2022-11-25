// eslint-disable-next-line max-classes-per-file
import {
  GPPIntegerFixedLength,
  GPPDatetime,
  GPPCountryCode,
  GPPBoolean,
  GPPOptimizedIntRange,
  GPPBitfield,
} from "../../core/data-types";
import { encodeBitStr2Base64Websafe } from "../../core//utils";
import { Section } from "../../core/section";

const GPP_VERSION = 2;

class TCFEuSectionEncoder implements Section {
  #gppSectionID = 2;
  #clientSideAPIPrefix = "tcfeuv2";
  #version = new GPPIntegerFixedLength.Builder()
    .setLength(6)
    .setValue(GPP_VERSION)
    .build();
  #created: GPPDatetime;
  #lastUpdated: GPPDatetime;
  #cmpID: GPPIntegerFixedLength;
  #cmpVersion: GPPIntegerFixedLength;
  #consentScreen: GPPIntegerFixedLength;
  #consentLanguage: GPPCountryCode;
  #vendorListVersion: GPPIntegerFixedLength;
  #tcfPolicyVersion: GPPIntegerFixedLength;
  #isServiceSpecific: GPPBoolean;
  #useNonStandardStacks: GPPBoolean;
  #specialFeatureOptIns: GPPBitfield;
  #purposeConsent: GPPBitfield;
  #purposesLITransparency: GPPBitfield;
  #purposeOneTreatment: GPPBoolean;
  #publisherCC: GPPCountryCode;
  #vendorConsent: GPPOptimizedIntRange;
  #vendorLegitimateInterest: GPPOptimizedIntRange;
  #numPubRestrictions: GPPIntegerFixedLength;
  #purposeID: GPPIntegerFixedLength;
  #restrictionType: GPPIntegerFixedLength;
  #pubRestrictionEntry: GPPOptimizedIntRange;
  #hasDisclosedVendorsSegment: boolean;
  #disclosedVendorsSegmentType: GPPIntegerFixedLength;
  #disclosedVendors: GPPOptimizedIntRange | null;
  #hasPubPurposesSegment: boolean;
  #pubPurposesSegmentType: GPPIntegerFixedLength;
  #pubPurposesConsent: GPPBitfield | null;
  #pubPurposesLITransparency: GPPBitfield | null;
  #numCustomPurposes: GPPIntegerFixedLength | null;
  #customPurposesConsent: GPPBitfield | null;
  #customPurposesLITransparency: GPPBitfield | null;

  static Builder = class {
    #createdBuilder = new GPPDatetime.Builder().setValue(new Date());
    #lastUpdatedBuilder = new GPPDatetime.Builder().setValue(new Date());
    #cmpIDBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(12)
      .setValue(0);
    #cmpVersionBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(12)
      .setValue(0);
    #consentScreenBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(6)
      .setValue(0);
    #consentLanguageBuilder = new GPPCountryCode.Builder().setValue("--");
    #vendorListVersionBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(12)
      .setValue(0);
    #tcfPolicyVersionBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(6)
      .setValue(0);
    #isServiceSpecificBuilder = new GPPBoolean.Builder().setValue(true);
    #useNonStandardStacksBuilder = new GPPBoolean.Builder().setValue(false);
    #specialFeatureOptInsBuilder = new GPPBitfield.Builder()
      .setLength(12)
      .setValues(Array(12).fill(0));
    #purposeConsentBuilder = new GPPBitfield.Builder()
      .setLength(24)
      .setValues(Array(24).fill(0));
    #purposesLITransparencyBuilder = new GPPBitfield.Builder()
      .setLength(24)
      .setValues(Array(24).fill(0));
    #purposeOneTreatmentBuilder = new GPPBoolean.Builder().setValue(false);
    #publisherCCBuilder = new GPPCountryCode.Builder().setValue("--");
    #vendorConsentBuilder =
      new GPPOptimizedIntRange.Builder().setValuesAsBitfield([0]);
    #vendorLegitimateInterestBuilder =
      new GPPOptimizedIntRange.Builder().setValuesAsBitfield([0]);
    #numPubRestrictionsBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(12)
      .setValue(0);
    #purposeIDBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(6)
      .setValue(0);
    #restrictionTypeBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(2)
      .setValue(0);
    #pubRestrictionEntryBuilder =
      new GPPOptimizedIntRange.Builder().setValuesAsBitfield([0]);
    #hasDisclosedVendorsSegmentBuilder = false;
    #disclosedVendorsSegmentTypeBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(3)
      .setValue(1);
    #disclosedVendorsBuilder =
      new GPPOptimizedIntRange.Builder().setValuesAsBitfield([0]);
    #hasPubPurposesSegmentBuilder = false;
    #pubPurposesSegmentTypeBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(3)
      .setValue(3);
    #pubPurposesConsentBuilder = new GPPBitfield.Builder()
      .setLength(24)
      .setValues(Array(24).fill(0));
    #pubPurposesLITransparencyBuilder = new GPPBitfield.Builder()
      .setLength(24)
      .setValues(Array(24).fill(0));
    #numCustomPurposesBuilder = new GPPIntegerFixedLength.Builder()
      .setLength(6)
      .setValue(0);
    #customPurposesConsentBuilder = new GPPBitfield.Builder()
      .setLength(1)
      .setValues(Array(1).fill(0));
    #customPurposesLITransparencyBuilder = new GPPBitfield.Builder()
      .setLength(1)
      .setValues(Array(1).fill(0));

    setCreated(value: Date) {
      this.#createdBuilder.setValue(value);
      return this;
    }
    setLastUpdated(value: Date) {
      this.#lastUpdatedBuilder.setValue(value);
      return this;
    }
    setCmpID(value: number) {
      this.#cmpIDBuilder.setValue(value);
      return this;
    }
    setCmpVersion(value: number) {
      this.#cmpVersionBuilder.setValue(value);
      return this;
    }
    setConsentScreen(value: number) {
      this.#consentScreenBuilder.setValue(value);
      return this;
    }
    setConsentLanguage(value: string) {
      this.#consentLanguageBuilder.setValue(value);
      return this;
    }
    setVendorListVersion(value: number) {
      this.#vendorListVersionBuilder.setValue(value);
      return this;
    }
    setTcfPolicyVersion(value: number) {
      this.#tcfPolicyVersionBuilder.setValue(value);
      return this;
    }
    setIsServiceSpecific(value: boolean) {
      this.#isServiceSpecificBuilder.setValue(value);
      return this;
    }
    setUseNonStandardStacks(value: boolean) {
      this.#useNonStandardStacksBuilder.setValue(value);
      return this;
    }
    setSpecialFeatureOptIns(value: GPPBitfield) {
      this.#specialFeatureOptInsBuilder.setValues(Array(12).fill(0));
      return this;
    }
    setPurposeConsent(value: GPPBitfield) {
      this.#purposeConsentBuilder.setValues(Array(24).fill(0));
      return this;
    }
    setPurposesLITransparency(value: GPPBitfield) {
      this.#purposesLITransparencyBuilder.setValues(Array(24).fill(0));
      return this;
    }
    setPurposeOneTreatment(value: boolean) {
      this.#purposeOneTreatmentBuilder.setValue(value);
      return this;
    }
    setPublisherCC(value: string) {
      this.#publisherCCBuilder;
      return this;
    }
    setVendorConsent(values: number[]) {
      this.#vendorConsentBuilder;
      return this;
    }
    setVendorLegitimateInterest(values: number[]) {
      this.#vendorLegitimateInterestBuilder.setValuesAsBitfield(values);
      return this;
    }
    setNumPubRestrictions(value: number) {
      this.#numPubRestrictionsBuilder.setValue(value);
      return this;
    }
    setPurposeID(value: number) {
      this.#purposeIDBuilder.setValue(value);
      return this;
    }
    setRestrictionType(value: number) {
      this.#restrictionTypeBuilder.setLength(2).setValue(value);
      return this;
    }
    setPubRestrictionEntry(values: number[]) {
      this.#pubRestrictionEntryBuilder.setValuesAsBitfield(values);
      return this;
    }
    setHasDisclosedVendorsSegment(value: boolean) {
      this.#hasDisclosedVendorsSegmentBuilder = value;
      return this;
    }
    setDisclosedVendorsSegmentType(value: number) {
      this.#disclosedVendorsSegmentTypeBuilder.setLength(3).setValue(value);
      return this;
    }
    setDisclosedVendorsAsBitfield(values: number[]) {
      this.#disclosedVendorsBuilder =
        new GPPOptimizedIntRange.Builder().setValuesAsBitfield(values);
      return this;
    }
    setHasPubPurposesSegment(value: boolean) {
      this.#hasPubPurposesSegmentBuilder = value;
      return this;
    }
    setPubPurposesSegmentType(value: number) {
      this.#pubPurposesSegmentTypeBuilder.setLength(3).setValue(value);
      return this;
    }
    setPubPurposesConsent(values: number[]) {
      this.#pubPurposesConsentBuilder.setValues(values);
      return this;
    }
    setPubPurposesLITransparency(values: number[]) {
      this.#pubPurposesLITransparencyBuilder.setValues(values);
      return this;
    }
    setNumCustomPurposes(value: number) {
      this.#numCustomPurposesBuilder.setValue(value);
      return this;
    }
    setCustomPurposesConsent(values: number[]) {
      this.#customPurposesConsentBuilder.setLength(1).setValues(values);
      return this;
    }
    setCustomPurposesLITransparency(values: number[]) {
      this.#customPurposesLITransparencyBuilder.setLength(1).setValues(values);
      return this;
    }

    build() {
      return new TCFEuSectionEncoder(
        this.#createdBuilder.build(),
        this.#lastUpdatedBuilder.build(),
        this.#cmpIDBuilder.build(),
        this.#cmpVersionBuilder.build(),
        this.#consentScreenBuilder.build(),
        this.#consentLanguageBuilder.build(),
        this.#vendorListVersionBuilder.build(),
        this.#tcfPolicyVersionBuilder.build(),
        this.#isServiceSpecificBuilder.build(),
        this.#useNonStandardStacksBuilder.build(),
        this.#specialFeatureOptInsBuilder.build(),
        this.#purposeConsentBuilder.build(),
        this.#purposesLITransparencyBuilder.build(),
        this.#purposeOneTreatmentBuilder.build(),
        this.#publisherCCBuilder.build(),
        this.#vendorConsentBuilder.build(),
        this.#vendorLegitimateInterestBuilder.build(),
        this.#numPubRestrictionsBuilder.build(),
        this.#purposeIDBuilder.build(),
        this.#restrictionTypeBuilder.build(),
        this.#pubRestrictionEntryBuilder.build(),
        this.#hasDisclosedVendorsSegmentBuilder,
        this.#disclosedVendorsSegmentTypeBuilder.build(),
        this.#disclosedVendorsBuilder.build(),
        this.#hasPubPurposesSegmentBuilder,
        this.#pubPurposesSegmentTypeBuilder.build(),
        this.#pubPurposesConsentBuilder.build(),
        this.#pubPurposesLITransparencyBuilder.build(),
        this.#numCustomPurposesBuilder.build(),
        this.#customPurposesConsentBuilder.build(),
        this.#customPurposesLITransparencyBuilder.build()
      );
    }
  };

  constructor(
    created: GPPDatetime,
    lastUpdated: GPPDatetime,
    cmpID: GPPIntegerFixedLength,
    cmpVersion: GPPIntegerFixedLength,
    consentScreen: GPPIntegerFixedLength,
    consentLanguage: GPPCountryCode,
    vendorListVersion: GPPIntegerFixedLength,
    tcfPolicyVersion: GPPIntegerFixedLength,
    isServiceSpecific: GPPBoolean,
    useNonStandardStacks: GPPBoolean,
    specialFeatureOptIns: GPPBitfield,
    purposeConsent: GPPBitfield,
    purposesLITransparency: GPPBitfield,
    purposeOneTreatment: GPPBoolean,
    publisherCC: GPPCountryCode,
    vendorConsent: GPPOptimizedIntRange,
    vendorLegitimateInterest: GPPOptimizedIntRange,
    numPubRestrictions: GPPIntegerFixedLength,
    purposeID: GPPIntegerFixedLength,
    restrictionType: GPPIntegerFixedLength,
    pubRestrictionEntry: GPPOptimizedIntRange,
    hasDisclosedVendorsSegment: boolean,
    disclosedVendorsSegmentType: GPPIntegerFixedLength,
    disclosedVendors: GPPOptimizedIntRange | null,
    hasPubPurposesSegment: boolean,
    pubPurposesSegmentType: GPPIntegerFixedLength,
    pubPurposesConsent: GPPBitfield,
    pubPurposesLITransparency: GPPBitfield,
    numCustomPurposes: GPPIntegerFixedLength,
    customPurposesConsent: GPPBitfield,
    customPurposesLITransparency: GPPBitfield
  ) {
    this.#created = created;
    this.#lastUpdated = lastUpdated;
    this.#cmpID = cmpID;
    this.#cmpVersion = cmpVersion;
    this.#consentScreen = consentScreen;
    this.#consentLanguage = consentLanguage;
    this.#vendorListVersion = vendorListVersion;
    this.#tcfPolicyVersion = tcfPolicyVersion;
    this.#isServiceSpecific = isServiceSpecific;
    this.#useNonStandardStacks = useNonStandardStacks;
    this.#specialFeatureOptIns = specialFeatureOptIns;
    this.#purposeConsent = purposeConsent;
    this.#purposesLITransparency = purposesLITransparency;
    this.#purposeOneTreatment = purposeOneTreatment;
    this.#publisherCC = publisherCC;
    this.#vendorConsent = vendorConsent;
    this.#vendorLegitimateInterest = vendorLegitimateInterest;
    this.#numPubRestrictions = numPubRestrictions;
    this.#purposeID = purposeID;
    this.#restrictionType = restrictionType;
    this.#pubRestrictionEntry = pubRestrictionEntry;
    this.#hasDisclosedVendorsSegment = hasDisclosedVendorsSegment;
    this.#disclosedVendorsSegmentType = disclosedVendorsSegmentType;
    this.#disclosedVendors = disclosedVendors;
    this.#hasPubPurposesSegment = hasPubPurposesSegment;
    this.#pubPurposesSegmentType = pubPurposesSegmentType;
    this.#pubPurposesConsent = pubPurposesConsent;
    this.#pubPurposesLITransparency = pubPurposesLITransparency;
    this.#numCustomPurposes = numCustomPurposes;
    this.#customPurposesConsent = customPurposesConsent;
    this.#customPurposesLITransparency = customPurposesLITransparency;
  }

  encode2BitStr() {
    let bitStr = "";
    bitStr += this.#version.encode2BitStr();
    bitStr += this.#created.encode2BitStr();
    bitStr += this.#lastUpdated.encode2BitStr();
    bitStr += this.#cmpID.encode2BitStr();
    bitStr += this.#cmpVersion.encode2BitStr();
    bitStr += this.#consentScreen.encode2BitStr();
    bitStr += this.#consentLanguage.encode2BitStr();
    bitStr += this.#vendorListVersion.encode2BitStr();
    bitStr += this.#tcfPolicyVersion.encode2BitStr();
    bitStr += this.#isServiceSpecific.encode2BitStr();
    bitStr += this.#useNonStandardStacks.encode2BitStr();
    bitStr += this.#specialFeatureOptIns.encode2BitStr();
    bitStr += this.#purposeConsent.encode2BitStr();
    bitStr += this.#purposesLITransparency.encode2BitStr();
    bitStr += this.#purposeOneTreatment.encode2BitStr();
    bitStr += this.#publisherCC.encode2BitStr();
    bitStr += this.#vendorConsent.encode2BitStr();
    bitStr += this.#vendorLegitimateInterest.encode2BitStr();
    bitStr += this.#numPubRestrictions.encode2BitStr();
    bitStr += this.#purposeID.encode2BitStr();
    bitStr += this.#restrictionType.encode2BitStr();
    bitStr += this.#pubRestrictionEntry.encode2BitStr();
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

export { TCFEuSectionEncoder };
