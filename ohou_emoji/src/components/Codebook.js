import CryptoJS from "crypto-js"
import Graphemer from 'graphemer';
import { SmileysCodebook } from "./codebooks/SmileysCodebook.js"
// import { HandInHandCodebook } from "./codebooks/HandInHandCodebook.js"

export function Codebook() {
  const smileysCodebook = SmileysCodebook()
  // const handInHandCodebook = HandInHandCodebook()

  var codebook = smileysCodebook
  // var codebook = handInHandCodebook

  const splitter = new Graphemer();
  function encryptTranslate(str) {
    var newStr = ""

    for (const ch of str) {
      let newChar = codebook.encryptCodebook[ch][Math.floor(Math.random() * codebook.scale)]

      if (newChar != undefined) {
        newStr += newChar
      }
    }

    return newStr
  }

  function decryptTranslate(str) {
    var newStr = ""

    for (const ch of splitter.splitGraphemes(str)) {
      let newChar = codebook.decryptCodebook[ch]

      if (newChar != undefined) {
        newStr += newChar
      }
    }

    return newStr
  }

  const key = CryptoJS.enc.Utf8.parse("ohouohouohouohou") //十六位十六进制数作为密钥
  const iv = CryptoJS.enc.Utf8.parse("ohou") //十六位十六进制数作为密钥偏移量

  // 解密方法
  function decrypt(text) {
    let transText = decryptTranslate(text)
    let encryptedHexStr = CryptoJS.enc.Hex.parse(transText);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  }

  //加密方法
  function encrypt(text) {
    if (text.length == 0) return null
    let transText = CryptoJS.enc.Utf8.parse(text)
    let encrypted = CryptoJS.AES.encrypt(transText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    let cntStr = encrypted.ciphertext.toString().toUpperCase()
    let ohouEmoji = encryptTranslate(cntStr)

    return codebook.tag + ohouEmoji + codebook.tag
  }

  return {
    encrypt,
    decrypt
  }
}