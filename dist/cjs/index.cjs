function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "GPPString", () => $60f162b5d1f5a419$export$9a6fd65b2eb16632);
$parcel$export(module.exports, "UspcaSection", () => $c0cab7f9048b82b2$export$a4ff45f93802db5f);
function $10cd80151499d7c9$export$d4369ef446c0648(dec) {
    return dec.toString(2);
}
function $10cd80151499d7c9$export$f97412ca1b01c8a6(value, length) {
    return $10cd80151499d7c9$export$d4369ef446c0648(value).length > length;
}
function $10cd80151499d7c9$export$e4deb62a27b498b6(n) {
    const fib = new Array(n);
    function largestFiboLessOrEqual(num) {
        fib[0] = 1;
        fib[1] = 2;
        let i;
        // eslint-disable-next-line no-plusplus
        for(i = 2; fib[i - 1] <= num; i++)fib[i] = fib[i - 1] + fib[i - 2];
        return i - 2;
    }
    function fibonacciEncode(number) {
        const index = largestFiboLessOrEqual(number);
        let num = number;
        const codeword = new Array(index + 3);
        let i = index;
        while(num > 0){
            codeword[i] = "1";
            num -= fib[i];
            i -= 1;
            while(i >= 0 && fib[i] > num){
                codeword[i] = "0";
                i -= 1;
            }
        }
        // Additional '1' bit
        codeword[index + 1] = "1";
        const string = codeword.join("");
        // Return pointer to codeword
        return string;
    }
    const code = fibonacciEncode(n);
    return code;
}
function $10cd80151499d7c9$export$55d61ca8b429bfd7(bitStr) {
    let fibcode = bitStr;
    fibcode = $10cd80151499d7c9$var$padString6bits(fibcode);
    const fibcodeDivided = fibcode.match(/.{1,6}/g);
    return fibcodeDivided.map((str)=>{
        // console.log(parseInt(str, 2) + 65);
        return String.fromCharCode(parseInt(str, 2) + 65);
    }).join("");
}
function $10cd80151499d7c9$var$padString6bits(string) {
    let mod = string.length % 6;
    // We don't require any padding
    if (!mod) return string;
    // See how much padding we need
    let rem = 6 - mod;
    let pad = "".padEnd(rem, "0");
    return string + pad;
}


//
// Boolean
//
class $07df4c434567a42b$export$f9e6d957cb90bdc0 {
    #value = null;
    static Builder = class {
        #value = false;
        setValue(value) {
            this.#value = !!value;
            return this;
        }
        build() {
            const boolean = new $07df4c434567a42b$export$f9e6d957cb90bdc0(this.#value);
            return boolean;
        }
    };
    constructor(value){
        this.#value = value;
    }
    toString() {
        return JSON.stringify({
            value: this.#value
        });
    }
    encode2BitStr() {
        if (this.#value) return "1";
        else return "0";
    }
}
//
// IntegerFixedLength
//
class $07df4c434567a42b$export$7b426f8413b91275 {
    #value = null;
    #length = null;
    static Builder = class {
        #value = 0;
        #length = 1;
        setLength(length = 1) {
            if (!Number.isInteger(length) && length > 1) throw "length param must be a positive integer";
            this.#checkIfTruncated(this.#value, length);
            this.#length = length;
            return this;
        }
        setValue(value) {
            if (!Number.isInteger(value) && value >= 0) throw "value param must be a non-negative integer";
            this.#checkIfTruncated(value, this.#length);
            this.#value = value;
            return this;
        }
        build() {
            const integer = new $07df4c434567a42b$export$7b426f8413b91275(this.#value, this.#length);
            return integer;
        }
        #checkIfTruncated(value, length) {
            const binString = (0, $10cd80151499d7c9$export$d4369ef446c0648)(value);
            if ((0, $10cd80151499d7c9$export$f97412ca1b01c8a6)(value, length)) throw `Truncation error, length must be larger than ${binString.length} for value ${value}`;
        }
    };
    constructor(value, length){
        this.#value = value;
        this.#length = length;
    }
    toString() {
        return JSON.stringify({
            value: this.#value,
            length: this.#length
        });
    }
    encode2BitStr() {
        const binString = (0, $10cd80151499d7c9$export$d4369ef446c0648)(this.#value);
        return binString.padStart(this.#length, "0");
    }
}
//
// IntegerFibonacci
//
// Integer encoded using Fibonacci encoding
// See “About Fibonacci Encoding” for more detail
// https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/blob/main/Core/Consent%20String%20Specification.md#fibonacci-encoding-to-deal-with-string-length-
class $07df4c434567a42b$export$1b157374afb6d863 {
    #value = null;
    static Builder = class {
        #value = 0;
        setValue(value) {
            if (!Number.isInteger(value) && value >= 0) throw "value param must be a non-negative integer";
            this.#value = value;
            return this;
        }
        build() {
            const integer = new $07df4c434567a42b$export$1b157374afb6d863(this.#value);
            return integer;
        }
    };
    constructor(value){
        this.#value = value;
    }
    toString() {
        return JSON.stringify({
            value: this.#value
        });
    }
    encode2BitStr() {
        return (0, $10cd80151499d7c9$export$e4deb62a27b498b6)(this.#value);
    }
}
//
// StringFixedLength
//
// A fixed amount of bit representing a string. The character’s ASCII integer ID is subtracted by 65 and encoded into an int(6).
// Example: int(6) “101010” represents integer 47 + 65 = char “h”
class $07df4c434567a42b$export$9ad0fa6611c6655f {
    #value = null;
    static Builder = class {
        #value = "";
        setValue(value) {
            this.#value = value;
            return this;
        }
        build() {
            return new $07df4c434567a42b$export$9ad0fa6611c6655f(this.#value);
        }
    };
    constructor(value){
        this.#value = value;
    }
    toString() {
        return JSON.stringify({
            value: this.#value
        });
    }
    encode2BitStr() {
        let encodedString = "";
        let int6;
        for (let char of this.#value){
            int6 = new $07df4c434567a42b$export$7b426f8413b91275.Builder().setLength(6).setValue(char.charCodeAt(0) - 65).build();
            encodedString += int6.encode2BitStr();
        }
        return encodedString;
    }
}
//
// Datetime
//
// A datetime is encoded as a 36 bit integer representing the 1/10th seconds since January 01 1970 00:00:00 UTC.
// Example JavaScript representation: Math.round((new Date()).getTime()/100)
class $07df4c434567a42b$export$8bb43bf38ef50c79 {
    #value = null;
    static Builder = class {
        #value = null;
        setValue(value) {
            if (!value instanceof Date) throw "value param must be an Date";
            this.#value = value;
            return this;
        }
        build() {
            return new $07df4c434567a42b$export$8bb43bf38ef50c79(this.#value);
        }
    };
    constructor(value){
        this.#value = value;
    }
    toString() {
        return JSON.stringify({
            value: this.#value
        });
    }
    encode2BitStr() {
        let int36 = new $07df4c434567a42b$export$7b426f8413b91275.Builder().setLength(36).setValue(Math.round(this.#value.getTime() / 100)).build();
        return int36.encode2BitStr();
    }
}
//
// RangeInteger
//
class $07df4c434567a42b$export$f7b8a6f27fd22b77 {
    #items = [];
    #SINGLE = "0";
    #GROUP = "1";
    static Builder = class {
        #items = [];
        #lastValue = 0;
        #SINGLE = "0";
        #GROUP = "1";
        addSingle(value) {
            if (!Number.isInteger(value)) throw "value param must be an integer";
            if (value <= this.#lastValue) throw "Values must be added in sorted ascending order";
            this.#items.push({
                type: this.#SINGLE,
                value: value
            });
            this.#lastValue = value;
            return this;
        }
        addGroup(fromValue, toValue) {
            if (!Number.isInteger(fromValue)) throw "fromValue param must be an integer";
            if (!Number.isInteger(toValue)) throw "toValue param must be an integer";
            if (fromValue >= toValue) throw "fromValue must be lower than toValue";
            if (fromValue <= this.#lastValue) throw "Values must be added in sorted ascending order";
            this.#items.push({
                type: this.#GROUP,
                fromValue: fromValue,
                toValue: toValue
            });
            this.#lastValue = toValue;
            return this;
        }
        build() {
            return new $07df4c434567a42b$export$f7b8a6f27fd22b77(this.#items);
        }
    };
    constructor(items){
        this.#items = items;
    }
    toString() {
        return JSON.stringify({
            items: this.#items
        });
    }
    encode2BitStr() {
        let encodedRange = "";
        encodedRange += new $07df4c434567a42b$export$7b426f8413b91275.Builder().setLength(12).setValue(this.#items.length).build().encode2BitStr();
        let lastValue = 0;
        this.#items.forEach((item, index)=>{
            if (item.type === this.#SINGLE) {
                encodedRange += this.#SINGLE;
                encodedRange += new $07df4c434567a42b$export$7b426f8413b91275.Builder().setLength(16).setValue(item.value - lastValue).build().encode2BitStr();
                lastValue = item.value;
            } else if (item.type === this.#GROUP) {
                encodedRange += this.#GROUP;
                encodedRange += new $07df4c434567a42b$export$7b426f8413b91275.Builder().setLength(16).setValue(item.fromValue - lastValue).build().encode2BitStr();
                encodedRange += new $07df4c434567a42b$export$7b426f8413b91275.Builder().setLength(16).setValue(item.toValue - item.fromValue).build().encode2BitStr();
                lastValue = item.toValue;
            }
        });
        return encodedRange;
    }
}
//
// RangeFibonacci
//
class $07df4c434567a42b$export$ffae1305b5a642f3 {
    #items = [];
    #SINGLE = "0";
    #GROUP = "1";
    static Builder = class {
        #items = [];
        #lastValue = 0;
        #SINGLE = "0";
        #GROUP = "1";
        addSingle(value) {
            if (!Number.isInteger(value)) throw "value param must be an integer";
            if (value <= this.#lastValue) throw "Values must be added in sorted ascending order";
            this.#items.push({
                type: this.#SINGLE,
                value: value
            });
            this.#lastValue = value;
            return this;
        }
        addGroup(fromValue, toValue) {
            if (!Number.isInteger(fromValue)) throw "fromValue param must be an integer";
            if (!Number.isInteger(toValue)) throw "toValue param must be an integer";
            if (fromValue >= toValue) throw "fromValue must be lower than toValue";
            if (fromValue <= this.#lastValue) throw "Values must be added in sorted ascending order";
            this.#items.push({
                type: this.#GROUP,
                fromValue: fromValue,
                toValue: toValue
            });
            this.#lastValue = toValue;
            return this;
        }
        build() {
            const rangeFibonacci = new $07df4c434567a42b$export$ffae1305b5a642f3(this.#items);
            return rangeFibonacci;
        }
    };
    constructor(items){
        this.#items = items;
    }
    toString() {
        return JSON.stringify({
            items: this.#items
        });
    }
    encode2BitStr() {
        let encodedRange = "";
        encodedRange += new $07df4c434567a42b$export$7b426f8413b91275.Builder().setLength(12).setValue(this.#items.length).build().encode2BitStr();
        let lastValue = 0;
        this.#items.forEach((item, index)=>{
            if (item.type === this.#SINGLE) {
                encodedRange += this.#SINGLE;
                encodedRange += (0, $10cd80151499d7c9$export$e4deb62a27b498b6)(item.value - lastValue);
                lastValue = item.value;
            } else if (item.type === this.#GROUP) {
                encodedRange += this.#GROUP;
                encodedRange += (0, $10cd80151499d7c9$export$e4deb62a27b498b6)(item.fromValue - lastValue);
                encodedRange += (0, $10cd80151499d7c9$export$e4deb62a27b498b6)(item.toValue - item.fromValue);
                lastValue = item.toValue;
            }
        });
        return encodedRange;
    }
}
//
// NBitField
//
class $07df4c434567a42b$export$f222bea123aa0987 {
    #nBits = null;
    #nBitSize = null;
    static Builder = class {
        #nBits = [];
        #nBitSize = 1;
        #numBits = 0;
        setNbitSize(nBitSize) {
            if (!Number.isInteger(nBitSize) && nBitSize > 0) throw "nBitSize param must be a positive integer";
            this.#nBitSize = nBitSize;
            return this;
        }
        setNumBits(numBits) {
            if (!Number.isInteger(numBits) && numBits > 0) throw "numBits param must be a positive integer";
            this.#numBits = numBits;
            for(let i = 0; i < numBits; i++)this.#nBits.push("0".padStart(this.#nBitSize, "0"));
            return this;
        }
        setNBit(position, value) {
            if (!Number.isInteger(position) && position >= 1 && position <= this.#numBits) throw `position param must be a positive integer, from 1 to ${this.#numBits}`;
            const integerFixedLength = new $07df4c434567a42b$export$7b426f8413b91275.Builder().setLength(this.#nBitSize).setValue(value).build();
            this.#nBits[position - 1] = integerFixedLength;
            return this;
        }
        build() {
            const nBitfield = new $07df4c434567a42b$export$f222bea123aa0987(this.#nBitSize, this.#nBits);
            return nBitfield;
        }
    };
    constructor(nBitSize, nBits){
        this.#nBitSize = nBitSize;
        this.#nBits = nBits;
    }
    toString() {
        return JSON.stringify({
            nBitSize: this.#nBitSize,
            nBits: this.#nBits
        });
    }
    encode2BitStr() {
        let encodedRange = "";
        this.#nBits.forEach((item)=>{
            encodedRange += item.encode2BitStr();
        });
        return encodedRange;
    }
}


class $f02352de531b9090$export$22fa760b01b36630 {
    #type = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(6).setValue(3).build();
    #version = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(6).setValue(1).build();
    #sections = null;
    constructor(sections){
        if (!Array.isArray(sections) || sections.length === 0) throw `sections must be an Array sections IDs of length > 0, for example: [2, 6]`;
        const rangeFibonacci = new (0, $07df4c434567a42b$export$ffae1305b5a642f3).Builder();
        for(let n = 0; n < sections.length; n++)rangeFibonacci.addSingle(sections[n]);
        this.#sections = rangeFibonacci.build();
    }
    encode2BitStr() {
        let encodedString = "";
        encodedString += this.#type.encode2BitStr();
        encodedString += this.#version.encode2BitStr();
        encodedString += this.#sections.encode2BitStr();
        return encodedString;
    }
}



const $60f162b5d1f5a419$var$GPP_TYPE = 3;
const $60f162b5d1f5a419$var$GPP_VERSION = 1;
class $60f162b5d1f5a419$export$9a6fd65b2eb16632 {
    #sections = new Map();
    static Builder = class {
        #sections = new Map();
        addSection(section) {
            this.#sections.set(section.gppSectionID, section);
            return this;
        }
        build() {
            return new $60f162b5d1f5a419$export$9a6fd65b2eb16632(this.#sections);
        }
    };
    constructor(sections){
        this.#sections = sections;
    }
    encode2BitStr() {
        let encodedString = "";
        if (this.#sections.size === 0) throw "You need to add sections to be able to build the GPP string";
        const sortedSections = this.#sortSections();
        const encodedHeader = new (0, $f02352de531b9090$export$22fa760b01b36630)(Array.from(sortedSections.keys()));
        encodedString += encodedHeader.encode2BitStr();
        for (const [key, value] of this.#sections)encodedString += "~" + value.encode2BitStr();
        return encodedString;
    }
    encode2Base64Websafe() {
        let encodedString = "";
        if (this.#sections.size === 0) throw "You need to add sections to be able to build the GPP string";
        const sortedSections = this.#sortSections();
        const encodedHeader = new (0, $f02352de531b9090$export$22fa760b01b36630)(Array.from(sortedSections.keys()));
        encodedString += (0, $10cd80151499d7c9$export$55d61ca8b429bfd7)(encodedHeader.encode2BitStr());
        for (const [key, value] of this.#sections)encodedString += "~" + (0, $10cd80151499d7c9$export$55d61ca8b429bfd7)(value.encode2BitStr());
        return encodedString;
    }
    toString() {
        return this.encode2BitStr();
    }
    #sortSections() {
        return new Map([
            ...this.#sections
        ].sort((a, b)=>String(a[0]).localeCompare(b[0])));
    }
}


// eslint-disable-next-line max-classes-per-file

class $c0cab7f9048b82b2$export$a4ff45f93802db5f {
    gppSectionID = 8;
    clientSideAPIPrefix = "uspca";
    version = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(6).setValue(1).build();
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
        #saleOptOutNotice = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(0).build();
        #sharingOptOutNotice = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(0).build();
        #sensitiveDataLimitUseNotice = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(0).build();
        #saleOptOut = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(0).build();
        #sharingOptOut = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(0).build();
        #sensitiveDataProcessing = new (0, $07df4c434567a42b$export$f222bea123aa0987).Builder().setNbitSize(2).setNumBits(9).setNBit(1, 0).setNBit(2, 0).setNBit(3, 0).setNBit(4, 0).setNBit(5, 0).setNBit(6, 0).setNBit(7, 0).setNBit(8, 0).setNBit(9, 0).build();
        #knownChildSensitiveDataConsents = new (0, $07df4c434567a42b$export$f222bea123aa0987).Builder().setNbitSize(2).setNumBits(2).setNBit(1, 0).setNBit(2, 0).build();
        #personalDataConsents = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(0).build();
        #mspaCoveredTransaction = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(0).build();
        #mspaOptOutOptionMode = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(0).build();
        #mspaServiceProviderMode = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(0).build();
        setSaleOptOutNotice(saleOptOutNotice) {
            if (saleOptOutNotice < 0 || saleOptOutNotice > 2) throw `param value ${saleOptOutNotice} of setSaleOptOutNotice method must be a non-negative integer between 0 and 2`;
            this.#saleOptOutNotice = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(saleOptOutNotice).build();
            return this;
        }
        setSharingOptOutNotice(sharingOptOutNotice) {
            if (sharingOptOutNotice < 0 || sharingOptOutNotice > 2) throw `param value ${sharingOptOutNotice} of setSharingOptOutNotice method must be a non-negative integer between 0 and 2`;
            this.#sharingOptOutNotice = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(sharingOptOutNotice).build();
            return this;
        }
        setSensitiveDataLimitUseNotice(sensitiveDataLimitUseNotice) {
            if (sensitiveDataLimitUseNotice < 0 || sensitiveDataLimitUseNotice > 2) throw `param value ${sensitiveDataLimitUseNotice} of setSensitiveDataLimitUseNotice method must be a non-negative integer between 0 and 2`;
            this.#sensitiveDataLimitUseNotice = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(sensitiveDataLimitUseNotice).build();
            return this;
        }
        setSaleOptOut(saleOptOut) {
            if (saleOptOut < 0 || saleOptOut > 2) throw `param value ${saleOptOut} of setSaleOptOut method must be a non-negative integer between 0 and 2`;
            this.#saleOptOut = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(saleOptOut).build();
            return this;
        }
        setSharingOptOut(sharingOptOut1) {
            if (sharingOptOut1 < 0 || sharingOptOut1 > 2) throw `param value ${sharingOptOut1} of setSharingOptOut method must be a non-negative integer between 0 and 2`;
            this.#sharingOptOut = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(sharingOptOut1).build();
            return this;
        }
        setSensitiveDataProcessing(sensitiveDataProcessing) {
            if (!Array.isArray(sensitiveDataProcessing) || sensitiveDataProcessing.length !== 9) throw `param in setSensitiveDataProcessing method must be an Array of length 9`;
            const nbitfield = new (0, $07df4c434567a42b$export$f222bea123aa0987).Builder().setNbitSize(2).setNumBits(9);
            for(let n = 0; n < 9; n++){
                const bitValue = sensitiveDataProcessing[n];
                nbitfield.setNBit(n + 1, bitValue);
            }
            this.#sensitiveDataProcessing = nbitfield.build();
            return this;
        }
        setKnownChildSensitiveDataConsents(knownChildSensitiveDataConsents) {
            if (!Array.isArray(knownChildSensitiveDataConsents) || knownChildSensitiveDataConsents.length !== 2) throw `param value ${knownChildSensitiveDataConsents} of section in setKnownChildSensitiveDataConsents method must be an Array of length 2`;
            const nbitfield = new (0, $07df4c434567a42b$export$f222bea123aa0987).Builder().setNbitSize(2).setNumBits(2);
            for(let n = 0; n < 2; n++){
                const bitValue = knownChildSensitiveDataConsents[n];
                nbitfield.setNBit(n + 1, bitValue);
            }
            this.#knownChildSensitiveDataConsents = nbitfield.build();
            return this;
        }
        setPersonalDataConsents(personalDataConsents) {
            if (personalDataConsents < 0 || personalDataConsents > 2) throw `param value ${sharingOptOut} of setPersonalDataConsents method must be a non-negative integer between 0 and 2`;
            this.#personalDataConsents = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(personalDataConsents).build();
            return this;
        }
        setMspaCoveredTransaction(mspaCoveredTransaction) {
            if (mspaCoveredTransaction < 0 || mspaCoveredTransaction > 2) throw `param value ${mspaCoveredTransaction} of setMspaCoveredTransaction method must be a non-negative integer between 0 and 2`;
            this.#mspaCoveredTransaction = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(mspaCoveredTransaction).build();
            return this;
        }
        setMspaOptOutOptionMode(mspaOptOutOptionMode) {
            if (mspaOptOutOptionMode < 0 || mspaOptOutOptionMode > 2) throw `param value ${sharingOptOut} of setMspaOptOutOptionMode method must be a non-negative integer between 0 and 2`;
            this.#mspaOptOutOptionMode = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(mspaOptOutOptionMode).build();
            return this;
        }
        setMspaServiceProviderMode(mspaServiceProviderMode) {
            if (mspaServiceProviderMode < 0 || mspaServiceProviderMode > 2) throw `param value ${sharingOptOut} of setMspaServiceProviderMode method must be a non-negative integer between 0 and 2`;
            this.#mspaServiceProviderMode = new (0, $07df4c434567a42b$export$7b426f8413b91275).Builder().setLength(2).setValue(mspaServiceProviderMode).build();
            return this;
        }
        build() {
            const gppString = new $c0cab7f9048b82b2$export$a4ff45f93802db5f(this.#saleOptOutNotice, this.#sharingOptOutNotice, this.#sensitiveDataLimitUseNotice, this.#saleOptOut, this.#sharingOptOut, this.#sensitiveDataProcessing, this.#knownChildSensitiveDataConsents, this.#personalDataConsents, this.#mspaCoveredTransaction, this.#mspaOptOutOptionMode, this.#mspaServiceProviderMode);
            return gppString;
        }
    };
    constructor(saleOptOutNotice, sharingOptOutNotice, sensitiveDataLimitUseNotice, saleOptOut, sharingOptOut1, sensitiveDataProcessing, knownChildSensitiveDataConsents, personalDataConsents, mspaCoveredTransaction, mspaOptOutOptionMode, mspaServiceProviderMode){
        this.#saleOptOutNotice = saleOptOutNotice;
        this.#sharingOptOutNotice = sharingOptOutNotice;
        this.#sensitiveDataLimitUseNotice = sensitiveDataLimitUseNotice;
        this.#saleOptOut = saleOptOut;
        this.#sharingOptOut = sharingOptOut1;
        this.#sensitiveDataProcessing = sensitiveDataProcessing;
        this.#knownChildSensitiveDataConsents = knownChildSensitiveDataConsents;
        this.#personalDataConsents = personalDataConsents;
        this.#mspaCoveredTransaction = mspaCoveredTransaction;
        this.#mspaOptOutOptionMode = mspaOptOutOptionMode;
        this.#mspaServiceProviderMode = mspaServiceProviderMode;
    }
    encode2BitStr() {
        let bitStr = "";
        bitStr += this.version.encode2BitStr();
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
        // const b64 = Buffer.from(bitStr, "base64url");
        return bitStr;
    }
}




//# sourceMappingURL=index.cjs.map
