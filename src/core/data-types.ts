import { int2BinStr, isOverflowed, int2Fibonacci } from "./utils";

//
// Global
//

enum GPPRangeItemType {
  SINGLE = "0",
  GROUP = "1",
}

interface GPPRangeItemSingle {
  type: GPPRangeItemType.SINGLE;
  value: number;
}

interface GPPRangeItemGroup {
  type: GPPRangeItemType.GROUP;
  fromValue: number;
  toValue: number;
}

//
// GPPBoolean
//

class GPPBoolean {
  #value = false;

  static Builder = class {
    #value = false;

    setValue(value: boolean) {
      this.#value = !!value;
      return this;
    }

    build() {
      return new GPPBoolean(this.#value);
    }
  };

  constructor(value: boolean) {
    this.#value = value;
  }

  toString() {
    return JSON.stringify({
      value: this.#value,
    });
  }

  encode2BitStr() {
    if (this.#value) return "1";
    else return "0";
  }
}

//
// GPPIntegerFixedLength
//

class GPPIntegerFixedLength {
  #value: number;
  #length: number;

  static Builder = class Builder {
    #value = 0;
    #length = 1;

    setLength(length: number) {
      if (!Number.isInteger(length) && length > 1) {
        throw "length param must be a positive integer";
      }
      this.#checkIfTruncated(this.#value, length);
      this.#length = length;
      return this;
    }

    setValue(value: number) {
      if (!Number.isInteger(value) && value >= 0) {
        throw "value param must be a non-negative integer";
      }
      this.#checkIfTruncated(value, this.#length);
      this.#value = value;
      return this;
    }

    build() {
      return new GPPIntegerFixedLength(this.#value, this.#length);
    }

    #checkIfTruncated(value: number, length: number) {
      const binString = int2BinStr(value);
      if (isOverflowed(value, length)) {
        throw `Truncation error, length must be larger than ${binString.length} for value ${value}`;
      }
    }
  };

  constructor(value: number, length: number) {
    this.#value = value;
    this.#length = length;
  }

  toString() {
    return JSON.stringify({
      value: this.#value,
      length: this.#length,
    });
  }

  encode2BitStr() {
    const binString = int2BinStr(this.#value);
    return binString.padStart(this.#length, "0");
  }
}

//
// GPPIntegerFibonacci
//
// Integer encoded using Fibonacci encoding
// See “About Fibonacci Encoding” for more detail
// https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/blob/main/Core/Consent%20String%20Specification.md#fibonacci-encoding-to-deal-with-string-length-

class GPPIntegerFibonacci {
  #value = 0;

  static Builder = class {
    #value = 0;

    setValue(value: number) {
      if (!Number.isInteger(value) && value >= 0) {
        throw "value param must be a non-negative integer";
      }
      this.#value = value;
      return this;
    }

    build() {
      return new GPPIntegerFibonacci(this.#value);
    }
  };

  constructor(value: number) {
    this.#value = value;
  }

  toString() {
    return JSON.stringify({
      value: this.#value,
    });
  }

  encode2BitStr() {
    return int2Fibonacci(this.#value);
  }
}

//
// GPPStringFixedLength
//
// A fixed amount of bit representing a string. The character’s ASCII integer ID is subtracted by 65 and encoded into an int(6).
// Example: int(6) “101010” represents integer 47 + 65 = char “h”

class GPPStringFixedLength {
  #value = "";

  static Builder = class {
    #value = "";

    setValue(value: string) {
      this.#value = value;
      return this;
    }

    build() {
      return new GPPStringFixedLength(this.#value);
    }
  };

  constructor(value: string) {
    this.#value = value;
  }

  toString() {
    return JSON.stringify({
      value: this.#value,
    });
  }

  encode2BitStr() {
    let encodedString = "";
    let int6;
    for (const char of this.#value) {
      int6 = new GPPIntegerFixedLength.Builder()
        .setLength(6)
        .setValue(char.charCodeAt(0) - 65)
        .build();
      encodedString += int6.encode2BitStr();
    }
    return encodedString;
  }
}

//
// GPPDatetime
//
// A datetime is encoded as a 36 bit integer representing the 1/10th seconds since January 01 1970 00:00:00 UTC.
// Example JavaScript representation: Math.round((new Date()).getTime()/100)

class GPPDatetime {
  #value = new Date();

  static Builder = class {
    #value = new Date();

    setValue(value?: Date) {
      if (!(value instanceof Date)) {
        throw "value must be a Date";
      }
      this.#value = value;
      return this;
    }

    build() {
      return new GPPDatetime(this.#value);
    }
  };

  constructor(value: Date) {
    this.#value = value;
  }

  toString() {
    return JSON.stringify({
      value: this.#value,
    });
  }

  encode2BitStr() {
    const int36 = new GPPIntegerFixedLength.Builder()
      .setLength(36)
      .setValue(Math.round(this.#value.getTime() / 100))
      .build();
    return int36.encode2BitStr();
  }
}

//
// GPPRangeInteger
//

class GPPRangeInteger {
  #items: (GPPRangeItemSingle | GPPRangeItemGroup)[] = [];

  static Builder = class {
    #items: (GPPRangeItemSingle | GPPRangeItemGroup)[] = [];
    #lastValue = 0;

    addSingle(value: number) {
      if (!Number.isInteger(value)) {
        throw "value param must be an integer";
      }
      if (value <= this.#lastValue) {
        throw "Values must be added in sorted ascending order";
      }

      this.#items.push({
        type: GPPRangeItemType.SINGLE,
        value: value,
      });
      this.#lastValue = value;
      return this;
    }

    addGroup(fromValue: number, toValue: number) {
      if (!Number.isInteger(fromValue)) {
        throw "fromValue param must be an integer";
      }
      if (!Number.isInteger(toValue)) {
        throw "toValue param must be an integer";
      }
      if (fromValue >= toValue) {
        throw "fromValue must be lower than toValue";
      }
      if (fromValue <= this.#lastValue) {
        throw "Values must be added in sorted ascending order";
      }
      this.#items.push({ type: GPPRangeItemType.GROUP, fromValue, toValue });
      this.#lastValue = toValue;
      return this;
    }

    build() {
      return new GPPRangeInteger(this.#items);
    }
  };

  constructor(items: (GPPRangeItemSingle | GPPRangeItemGroup)[]) {
    this.#items = items;
  }

  toString() {
    return JSON.stringify({
      items: this.#items,
    });
  }

  encode2BitStr() {
    let encodedRange = "";
    encodedRange += new GPPIntegerFixedLength.Builder()
      .setLength(12)
      .setValue(this.#items.length)
      .build()
      .encode2BitStr();
    let lastValue = 0;
    this.#items.forEach((item) => {
      if (item.type === GPPRangeItemType.SINGLE) {
        encodedRange += GPPRangeItemType.SINGLE;
        encodedRange += new GPPIntegerFixedLength.Builder()
          .setLength(16)
          .setValue(item.value - lastValue)
          .build()
          .encode2BitStr();

        lastValue = item.value;
      } else if (item.type === GPPRangeItemType.GROUP) {
        encodedRange += GPPRangeItemType.GROUP;
        encodedRange += new GPPIntegerFixedLength.Builder()
          .setLength(16)
          .setValue(item.fromValue - lastValue)
          .build()
          .encode2BitStr();
        encodedRange += new GPPIntegerFixedLength.Builder()
          .setLength(16)
          .setValue(item.toValue - item.fromValue)
          .build()
          .encode2BitStr();
        lastValue = item.toValue;
      }
    });
    return encodedRange;
  }
}

//
// GPPRangeFibonacci
//

class GPPRangeFibonacci {
  #items: (GPPRangeItemGroup | GPPRangeItemSingle)[] = [];

  static Builder = class {
    #items: (GPPRangeItemGroup | GPPRangeItemSingle)[] = [];
    #lastValue = 0;

    addSingle(value: number) {
      if (!Number.isInteger(value)) {
        throw "value param must be an integer";
      }
      if (value <= this.#lastValue) {
        throw "Values must be added in sorted ascending order";
      }
      this.#items.push({ type: GPPRangeItemType.SINGLE, value: value });
      this.#lastValue = value;
      return this;
    }

    addGroup(fromValue: number, toValue: number) {
      if (!Number.isInteger(fromValue)) {
        throw "fromValue param must be an integer";
      }
      if (!Number.isInteger(toValue)) {
        throw "toValue param must be an integer";
      }
      if (fromValue >= toValue) {
        throw "fromValue must be lower than toValue";
      }
      if (fromValue <= this.#lastValue) {
        throw "Values must be added in sorted ascending order";
      }
      this.#items.push({
        type: GPPRangeItemType.GROUP,
        fromValue,
        toValue,
      });
      this.#lastValue = toValue;
      return this;
    }

    build() {
      const rangeFibonacci = new GPPRangeFibonacci(this.#items);
      return rangeFibonacci;
    }
  };

  constructor(items: (GPPRangeItemGroup | GPPRangeItemSingle)[]) {
    this.#items = items;
  }

  toString() {
    return JSON.stringify({
      items: this.#items,
    });
  }

  encode2BitStr() {
    let encodedRange = "";
    encodedRange += new GPPIntegerFixedLength.Builder()
      .setLength(12)
      .setValue(this.#items.length)
      .build()
      .encode2BitStr();

    let lastValue = 0;
    this.#items.forEach((item) => {
      if (item.type === GPPRangeItemType.SINGLE) {
        encodedRange += item.type;
        encodedRange += int2Fibonacci(item.value - lastValue);
        lastValue = item.value;
      } else if (item.type === GPPRangeItemType.GROUP) {
        encodedRange += item.type;
        encodedRange += int2Fibonacci(item.fromValue - lastValue);
        encodedRange += int2Fibonacci(item.toValue - item.fromValue);
        lastValue = item.toValue;
      }
    });
    return encodedRange;
  }
}

//
// GPPNBitfield
//

class GPPNBitfield {
  #nBits: GPPIntegerFixedLength[] = [];

  static Builder = class {
    #nBits: GPPIntegerFixedLength[] = [];
    #numBits: number | null = null;
    #bitSize: number | null = null;

    setLength(length: number) {
      if (!Number.isInteger(length) && length > 0) {
        throw "length param must be a positive integer";
      }
      this.#numBits = length;
      return this;
    }

    setBitSize(bitSize: number) {
      if (!Number.isInteger(bitSize) && bitSize > 0) {
        throw "bitSize param must be a positive integer";
      }
      this.#bitSize = bitSize;
      return this;
    }

    setValues(values: number[]) {
      if (this.#bitSize === null) {
        throw `You must initialize the GPPBitfield by calling the setBitSize method before calling the setValues method`;
      }
      if (this.#numBits === null) {
        throw `You must initialize the GPPBitfield by calling the setLength method before calling the setValues method`;
      }
      if (!Array.isArray(values) || values.length !== this.#numBits) {
        throw `nBitValues must be an Array of length ${this.#numBits}`;
      }
      this.#nBits = [];
      for (let i = 0; i < values.length; i++) {
        this.#nBits.push(
          new GPPIntegerFixedLength.Builder()
            .setLength(this.#bitSize)
            .setValue(values[i])
            .build()
        );
      }
      return this;
    }

    build() {
      const nBitfield = new GPPNBitfield(this.#nBits);
      return nBitfield;
    }
  };

  constructor(nBits: GPPIntegerFixedLength[]) {
    this.#nBits = nBits;
  }

  toString() {
    return JSON.stringify({
      nBits: this.#nBits,
    });
  }

  encode2BitStr() {
    let encodedRange = "";
    this.#nBits.forEach((item) => {
      encodedRange += item.encode2BitStr();
    });
    return encodedRange;
  }
}

//
// GPPBitfield
//

class GPPBitfield {
  #bitField: GPPNBitfield;

  static Builder = class {
    #bitFieldBuilder = new GPPNBitfield.Builder().setBitSize(1);
    #numBits: number | null = null;

    setLength(length: number) {
      if (!Number.isInteger(length) && length > 0) {
        throw "numBits param must be a positive integer";
      }
      this.#numBits = length;
      return this;
    }

    setValues(values: number[]) {
      this.#bitFieldBuilder.setLength(values.length).setValues(values);
      return this;
    }

    build() {
      return new GPPBitfield(this.#bitFieldBuilder.build());
    }
  };

  constructor(bitField: GPPNBitfield) {
    this.#bitField = bitField;
  }

  toString() {
    return JSON.stringify({
      nBits: this.#bitField,
    });
  }

  encode2BitStr() {
    return this.#bitField.encode2BitStr();
  }
}

//
// OptimizedIntRange
//

class GPPOptimizedIntRange {
  #numItems = 0;
  #isRangeEncoding: boolean | null = null;
  #RangeOrBitfieldData: GPPRangeInteger | GPPBitfield | null = null;

  static Builder = class {
    #numItems = 0;
    #isRangeEncoding: boolean | null = null;
    #RangeOrBitfieldData: GPPRangeInteger | GPPBitfield | null = null;

    setValuesAsBitfield(values: number[]) {
      this.#numItems = values.length;
      this.#isRangeEncoding = false;
      this.#RangeOrBitfieldData = new GPPBitfield.Builder()
        .setLength(values.length)
        .setValues(values)
        .build();
      return this;
    }

    setValuesAsRange(from: number, to: number) {
      this.#numItems = to;
      this.#isRangeEncoding = true;
      this.#RangeOrBitfieldData = new GPPRangeInteger.Builder()
        .addGroup(from, to)
        .build();
      return this;
    }

    build() {
      const nBitfield = new GPPOptimizedIntRange(
        this.#numItems,
        this.#isRangeEncoding,
        this.#RangeOrBitfieldData
      );
      return nBitfield;
    }
  };

  constructor(
    numItems: number,
    isRangeEncoding: boolean | null,
    RangeOrBitfieldData: GPPRangeInteger | GPPBitfield | null
  ) {
    this.#numItems = numItems;
    this.#isRangeEncoding = isRangeEncoding;
    this.#RangeOrBitfieldData = RangeOrBitfieldData;
  }

  toString() {
    return JSON.stringify({
      numItems: this.#numItems,
      isRangeEncoding: this.#isRangeEncoding,
      RangeOrBitfieldData: this.#RangeOrBitfieldData,
    });
  }

  encode2BitStr() {
    let encodedRange = "";
    if (
      this.#numItems > 0 &&
      this.#isRangeEncoding !== null &&
      this.#RangeOrBitfieldData !== null
    ) {
      encodedRange += new GPPIntegerFixedLength.Builder()
        .setLength(16)
        .setValue(this.#numItems)
        .build()
        .encode2BitStr();
      encodedRange += new GPPBoolean.Builder()
        .setValue(this.#isRangeEncoding)
        .build()
        .encode2BitStr();
      encodedRange += this.#RangeOrBitfieldData.encode2BitStr();
    }
    return encodedRange;
  }
}

//
// GPPCountryCode
//

class GPPCountryCode {
  #value = "";

  static Builder = class {
    #value = "";

    setValue(value: string) {
      this.#value = value;
      return this;
    }

    build() {
      return new GPPCountryCode(this.#value);
    }
  };

  constructor(value: string) {
    this.#value = value;
  }

  toString() {
    return JSON.stringify({
      value: this.#value,
    });
  }

  encode2BitStr() {
    return this.#value;
  }
}

export {
  GPPBoolean,
  GPPIntegerFixedLength,
  GPPIntegerFibonacci,
  GPPStringFixedLength,
  GPPDatetime,
  GPPRangeInteger,
  GPPRangeFibonacci,
  GPPNBitfield,
  GPPBitfield,
  GPPOptimizedIntRange,
  GPPCountryCode,
};
