export function dec2bin(dec) {
  return dec.toString(2);
}

export function isOverflowed(value, length) {
  return dec2bin(value).length > length;
}

export function int2Fibonacci(n) {
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

export function encode2BitStr2Base64Websafe(bitStr) {
  let fibcode = bitStr;
  fibcode = padString6bits(fibcode);
  const fibcodeDivided = fibcode.match(/.{1,6}/g);
  return fibcodeDivided
    .map((str) => {
      // console.log(parseInt(str, 2) + 65);
      return String.fromCharCode(parseInt(str, 2) + 65);
    })
    .join("");
}

function padString6bits(string) {
  let mod = string.length % 6;
  // We don't require any padding
  if (!mod) return string;
  // See how much padding we need
  let rem = 6 - mod;
  let pad = "".padEnd(rem, "0");
  return string + pad;
}
