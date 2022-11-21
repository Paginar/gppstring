declare class IntegerFixedLength {
    #private;
    static Builder: {
        new (): {
            "__#4@#value": number;
            "__#4@#length": number;
            setLength(length?: number): any;
            setValue(value: number): any;
            build(): IntegerFixedLength;
            "__#4@#checkIfTruncated"(value: number, length: number): void;
        };
    };
    constructor(value: number, length: number);
    toString(): string;
    encode2BitStr(): string;
}
declare class NBitfield {
    #private;
    static Builder: {
        new (): {
            "__#16@#nBits": IntegerFixedLength[];
            "__#16@#nBitSize": number;
            "__#16@#numBits": number;
            setNbitSize(nBitSize: number): any;
            setNumBits(numBits: number): any;
            setNBit(position: number, value: number): any;
            build(): NBitfield;
        };
    };
    constructor(nBitSize: number, nBits: IntegerFixedLength[]);
    toString(): string;
    encode2BitStr(): string;
}
interface Section {
    getGPPSectionID(): number;
    encode2BitStr(): string;
    getClientSideAPIPrefix(): string;
}
export class GPPString {
    #private;
    static Builder: {
        new (): {
            "__#19@#sections": Map<number, Section>;
            addSection(section: Section): any;
            build(): GPPString;
        };
    };
    constructor(sections: Map<number, Section>);
    encode2BitStr(): string;
    encode2Base64Websafe(): string;
    toString(): string;
}
export class UspcaSection implements Section {
    #private;
    static Builder: {
        new (): {
            "__#21@#saleOptOutNotice": IntegerFixedLength;
            "__#21@#sharingOptOutNotice": IntegerFixedLength;
            "__#21@#sensitiveDataLimitUseNotice": IntegerFixedLength;
            "__#21@#saleOptOut": IntegerFixedLength;
            "__#21@#sharingOptOut": IntegerFixedLength;
            "__#21@#sensitiveDataProcessing": NBitfield;
            "__#21@#knownChildSensitiveDataConsents": NBitfield;
            "__#21@#personalDataConsents": IntegerFixedLength;
            "__#21@#mspaCoveredTransaction": IntegerFixedLength;
            "__#21@#mspaOptOutOptionMode": IntegerFixedLength;
            "__#21@#mspaServiceProviderMode": IntegerFixedLength;
            setSaleOptOutNotice(saleOptOutNotice: number): any;
            setSharingOptOutNotice(sharingOptOutNotice: number): any;
            setSensitiveDataLimitUseNotice(sensitiveDataLimitUseNotice: number): any;
            setSaleOptOut(saleOptOut: number): any;
            setSharingOptOut(sharingOptOut: number): any;
            setSensitiveDataProcessing(sensitiveDataProcessing: number): any;
            setKnownChildSensitiveDataConsents(knownChildSensitiveDataConsents: number): any;
            setPersonalDataConsents(personalDataConsents: number): any;
            setMspaCoveredTransaction(mspaCoveredTransaction: number): any;
            setMspaOptOutOptionMode(mspaOptOutOptionMode: number): any;
            setMspaServiceProviderMode(mspaServiceProviderMode: number): any;
            build(): UspcaSection;
        };
    };
    constructor(saleOptOutNotice: IntegerFixedLength, sharingOptOutNotice: IntegerFixedLength, sensitiveDataLimitUseNotice: IntegerFixedLength, saleOptOut: IntegerFixedLength, sharingOptOut: IntegerFixedLength, sensitiveDataProcessing: NBitfield, knownChildSensitiveDataConsents: NBitfield, personalDataConsents: IntegerFixedLength, mspaCoveredTransaction: IntegerFixedLength, mspaOptOutOptionMode: IntegerFixedLength, mspaServiceProviderMode: IntegerFixedLength);
    encode2BitStr(): string;
    getGPPSectionID(): number;
    getClientSideAPIPrefix(): string;
}

//# sourceMappingURL=index.d.ts.map
