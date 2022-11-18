import { dec2bin, isOverflowed, fibonacciEncoding } from "./utils";

//
// Boolean
//

class Boolean {
  #value = null;

  static Builder = class {
    #value = false;

    setValue(value) {
      this.#value = !!value;
      return this;
    }

    build() {
      const boolean = new Boolean(this.#value);
      return boolean;
    }
  };

  constructor(value) {
    this.#value = value;
  }

  toString() {
    return JSON.stringify({
      value: this.#value,
    });
  }

  encode() {
    if (this.#value) return "1";
    else return "0";
  }
}

//
// IntegerFixedLength
//

class IntegerFixedLength {
  #value = null;
  #length = null;

  static Builder = class {
    #value = 0;
    #length = 1;

    setLength(length = 1) {
      if (!Number.isInteger(length) && length > 1) {
        throw "length param must be a positive integer";
      }
      this.#checkIfTruncated(this.#value, length);
      this.#length = length;
      return this;
    }

    setValue(value) {
      if (!Number.isInteger(value) && value >= 0) {
        throw "value param must be a non-negative integer";
      }
      this.#checkIfTruncated(value, this.#length);
      this.#value = value;
      return this;
    }

    build() {
      const integer = new IntegerFixedLength(this.#value, this.#length);
      return integer;
    }

    #checkIfTruncated(value, length) {
      const binString = dec2bin(value);
      if (isOverflowed(value, length)) {
        throw `Truncation error, length must be larger than ${binString.length} for value ${value}`;
      }
    }
  };

  constructor(value, length) {
    this.#value = value;
    this.#length = length;
  }

  toString() {
    return JSON.stringify({
      value: this.#value,
      length: this.#length,
    });
  }

  encode() {
    const binString = dec2bin(this.#value);
    return binString.padStart(this.#length, "0");
  }
}

//
// IntegerFibonacci
//

class IntegerFibonacci {
  #value = null;

  static Builder = class {
    #value = 0;

    setValue(value) {
      if (!Number.isInteger(value) && value >= 0) {
        throw "value param must be a non-negative integer";
      }
      this.#value = value;
      return this;
    }

    build() {
      const integer = new IntegerFibonacci(this.#value);
      return integer;
    }
  };

  constructor(value) {
    this.#value = value;
  }

  toString() {
    return JSON.stringify({
      value: this.#value,
    });
  }

  encode() {
    return fibonacciEncoding(this.#value);
  }
}

//
// StringFixedLength
//

class StringFixedLength {
  #value = null;

  static Builder = class {
    #value = "";

    setValue(value) {
      this.#value = value;
      return this;
    }

    build() {
      return new StringFixedLength(this.#value);
    }
  };

  constructor(value) {
    this.#value = value;
  }

  toString() {
    return JSON.stringify({
      value: this.#value,
    });
  }

  encode() {
    let encodedString = "";
    let int6;
    for (let char of this.#value) {
      int6 = new IntegerFixedLength.Builder()
        .setLength(6)
        .setValue(char.charCodeAt(0) - 65)
        .build();
      encodedString += int6.encode();
    }
    return encodedString;
  }
}

//
// RangeFibonacci
//

class RangeFibonacci {
  #items = [];
  #SINGLE = "0";
  #GROUP = "1";

  static Builder = class {
    #items = [];
    #lastValue = 0;
    #SINGLE = "0";
    #GROUP = "1";

    addSingle(value) {
      if (!Number.isInteger(value)) {
        throw "value param must be an integer";
      }
      if (value <= this.#lastValue) {
        throw "Values must be added in sorted ascending order";
      }
      this.#items.push({ type: this.#SINGLE, value: value });
      this.#lastValue = value;
      return this;
    }

    addGroup(fromValue, toValue) {
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
      this.#items.push({ type: this.#GROUP, fromValue, toValue });
      this.#lastValue = toValue;
      return this;
    }

    build() {
      const rangeFibonacci = new RangeFibonacci(this.#items);
      return rangeFibonacci;
    }
  };

  constructor(items) {
    this.#items = items;
  }

  toString() {
    return JSON.stringify({
      items: this.#items,
    });
  }

  encode() {
    let encodedRange = "";
    encodedRange += new IntegerFixedLength.Builder()
      .setLength(12)
      .setValue(this.#items.length)
      .build()
      .encode();

    let lastValue = 0;
    this.#items.forEach((item, index) => {
      // console.log(`Index: ${index}, type: ${JSON.stringify(item)}`);
      if (item.type === this.#SINGLE) {
        encodedRange += this.#SINGLE;
        encodedRange += fibonacciEncoding(item.value - lastValue);
        lastValue = item.value;
      } else if (item.type === this.#GROUP) {
        encodedRange += this.#GROUP;
        encodedRange += fibonacciEncoding(item.fromValue - lastValue);
        encodedRange += fibonacciEncoding(item.toValue - item.fromValue);
        lastValue = item.toValue;
      }
    });
    return encodedRange;
  }
}

//
// NBitField
//

class NBitfield {
  #nBits = null;
  #nBitSize = null;

  static Builder = class {
    #nBits = [];
    #nBitSize = 1;
    #numBits = 0;

    setNbitSize(nBitSize) {
      if (!Number.isInteger(nBitSize) && nBitSize > 0) {
        throw "nBitSize param must be a positive integer";
      }
      this.#nBitSize = nBitSize;
      return this;
    }

    setNumBits(numBits) {
      if (!Number.isInteger(numBits) && numBits > 0) {
        throw "numBits param must be a positive integer";
      }
      this.#numBits = numBits;
      for (let i = 0; i < numBits; i++) {
        this.#nBits.push("0".padStart(this.#nBitSize, "0"));
      }
      return this;
    }

    setNBit(position, value) {
      if (
        !Number.isInteger(position) &&
        position >= 1 &&
        position <= this.#numBits
      ) {
        throw `position param must be a positive integer, from 1 to ${
          this.#numBits
        }`;
      }
      const integerFixedLength = new IntegerFixedLength.Builder()
        .setLength(this.#nBitSize)
        .setValue(value)
        .build();
      this.#nBits[position - 1] = integerFixedLength;
      return this;
    }

    build() {
      const nBitfield = new NBitfield(this.#nBitSize, this.#nBits);
      return nBitfield;
    }
  };

  constructor(nBitSize, nBits) {
    this.#nBitSize = nBitSize;
    this.#nBits = nBits;
  }

  toString() {
    return JSON.stringify({
      nBitSize: this.#nBitSize,
      nBits: this.#nBits,
    });
  }

  encode() {
    let encodedRange = "";
    this.#nBits.forEach((item, index) => {
      // console.log(`Index: ${index}, type: ${JSON.stringify(item)}`);
      encodedRange += item.encode();
    });
    return encodedRange;
  }
}
export {
  Boolean,
  IntegerFixedLength,
  IntegerFibonacci,
  StringFixedLength,
  RangeFibonacci,
  NBitfield,
};
