function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function fibonacciEncoding(n) {
  const fib = new Array(n);

  function largestFiboLessOrEqual(num) {
    fib[0] = 1;
    fib[1] = 2;
    let i;
    // eslint-disable-next-line no-plusplus
    for (i = 2; fib[i - 1] <= num; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    return i - 2;
  }

  function fibonacciEncode(number) {
    const index = largestFiboLessOrEqual(number);
    let num = number;
    const codeword = new Array(index + 3);
    let i = index;
    while (num > 0) {
      codeword[i] = "1";
      num -= fib[i];
      i -= 1;
      while (i >= 0 && fib[i] > num) {
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

class Boolean {
  #value = null;

  static Builder = class {
    #value = null;

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

  // decode() {
  //   return this.#value;
  // }
}

class IntegerFixedLength {
  #value = null;
  #length = null;

  static Builder = class {
    #value = null;
    #length = null;

    setValue(value, length) {
      this.#value = value;
      this.#length = length;
      return this;
    }

    build() {
      const integer = new IntegerFixedLength(this.#value, this.#length);
      return integer;
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
    if (binString.length <= this.#length)
      return binString.padStart(this.#length, "0");
    else
      throw `Truncation error, length must be larger than ${
        this.#length
      } for value ${this.#value}`;
  }

  // decode() {
  //   return this.#value;
  // }
}

class RangeFibonacci {
  #items = [];
  #SINGLE = "0";
  #GROUP = "1";

  static Builder = class {
    #items = [];
    #lastValue = null;
    #SINGLE = "0";
    #GROUP = "1";

    addSingle(value) {
      if (value <= this.#lastValue) {
        throw "values must be added in sorted ascending order";
      }
      this.#items.push({ type: this.#SINGLE, value: value });
      this.#lastValue = value;
      return this;
    }

    addGroup(fromValue, toValue) {
      if (fromValue >= toValue) {
        throw "fromValue must be lower than toValue";
      }
      if (fromValue <= this.#lastValue) {
        throw "values must be added in sorted ascending order";
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
      .setValue(this.#items.length, 12)
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

class NBitfield {
  #nBits = [];
  #nBitSize = null;

  static Builder = class {
    #nBits = [];
    #nBitSize = null;

    setNbitSize(nBitSize) {
      this.#nBitSize = nBitSize;
      return this;
    }

    addNBit(value) {
      const binString = dec2bin(value);
      if (binString.length <= this.#nBitSize)
        this.#nBits.push(binString.padStart(this.#nBitSize, "0"));
      else
        throw `Truncation error, nBitSize must be larger than ${
          binString.length
        }. Currently it is set to ${this.#nBitSize}`;
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
      encodedRange += item;
    });
    return encodedRange;
  }
}
export { Boolean, IntegerFixedLength, RangeFibonacci, NBitfield };
