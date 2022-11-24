export function int2BinStr(value: number) {
  return value.toString(2);
}

export function isOverflowed(value: number, length: number) {
  return int2BinStr(value).length > length;
}

export function int2Fibonacci(n: number) {
  const fib = new Array(n);

  function largestFiboLessOrEqual(num: number) {
    fib[0] = 1;
    fib[1] = 2;
    let i;
    // eslint-disable-next-line no-plusplus
    for (i = 2; fib[i - 1] <= num; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    return i - 2;
  }

  function fibonacciencode2BitStr(number: number) {
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
  const code = fibonacciencode2BitStr(n);
  return code;
}

export function encodeBitStr2Base64Websafe(bitStr: string) {
  // See https://en.wikipedia.org/wiki/Base64
  const base64Alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const chars = bitStr.match(/.{1,6}/g) || [];
  let encodedString = "";
  for (let char of chars) {
    if (char.length < 6) {
      char = padString6bits(char);
    }
    const charPos = parseInt(char, 2);
    const charValue = base64Alphabet[charPos];
    encodedString += charValue;
  }
  return webSafe64(encodedString);
}

function padString6bits(string: string) {
  const mod: number = string.length % 6;
  if (!mod) return string;
  const rem = 6 - mod;
  const pad = "".padEnd(rem, "0");
  return string + pad;
}

function webSafe64(base64: string) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
