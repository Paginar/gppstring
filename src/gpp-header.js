import { Boolean, IntegerFixedLength, RangeFibonacci, NBitfield } from './core/data-types'


class GppHeader {
    #sections;
    #type;
    #version;
  
    constructor(sections, type, version) {
      this.#sections = sections;
      this.#type = type
      this.#verison = version
    }
  
    asciEncode(bitStr){
      const fibcode = bitStr;
  
      while (fibcode.length % 6 !== 0) {
        fibcode += '0';
      }
  
      const fibcodeDivided = fibcode.match(/.{1,6}/g)
  
      return fibcodeDivided.map((str) => String.fromCharCode(str)).join('')
    }
  
    encode() {
      const versionInt = IntegerFixedLength(this.#version)
      const typeInt = IntegerFixedLength(this.#type)
      const sections = RangeFibonacci(this.#sections)
      const joinTypesStr = `${versionInt}${typeInt}${sections}`
      
      console.log(`${joinTypesStr}`)
      return asciEncode(joinTypesStr)
    }
  }

export default GppHeader;