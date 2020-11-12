import CryptoJS from "crypto-js"
import Graphemer from 'graphemer';
import { CodebookType } from "./codebooks/CodebookType";
import { SmileysCodebook } from "./codebooks/SmileysCodebook"
import { HandInHandCodebook } from "./codebooks/HandInHandCodebook"
import { GestureCodebook } from "./codebooks/GestureCodebook"
import { FlagCodebook } from "./codebooks/FlagCodebook"
import { FoodCodebook } from "./codebooks/FoodCodebook"
import { PokerCodebook } from "./codebooks/PokerCodebook"
import { MahjongCodebook } from "./codebooks/MahjongCodebook"

export function Codebook() {
  const smileysCodebook = SmileysCodebook()
  const handInHandCodebook = HandInHandCodebook()
  const gestureCodebook = GestureCodebook()
  const glagCodebook = FlagCodebook()
  const foodCodebook = FoodCodebook()
  const pokerCodebook = PokerCodebook()
  const mahjongCodebook = MahjongCodebook()

  var codebook = smileysCodebook

  function changeCodebookType(type: string) {
    if (type == smileysCodebook.tag) {
      codebook = smileysCodebook
    } else if (type == handInHandCodebook.tag) {
      codebook = handInHandCodebook
    } else if (type == gestureCodebook.tag) {
      codebook = gestureCodebook
    } else if (type == glagCodebook.tag) {
      codebook = glagCodebook
    } else if (type == foodCodebook.tag) {
      codebook = foodCodebook
    } else if (type == pokerCodebook.tag) {
      codebook = pokerCodebook
    } else if (type == mahjongCodebook.tag) {
      codebook = mahjongCodebook
    }
  }

  function spotType(cnt: string): string | null {
    for (const index in CodebookType) {
      if (Object.prototype.hasOwnProperty.call(CodebookType, index)) {
        const element = CodebookType[index];
        const matchReg = '/' + element + '(\\S*)' + element + '/g'
        const matchResult = cnt.match(eval(matchReg))
        if (matchResult != null) {
          return element
        }
      }
    }

    return null
  }

  const splitter = new Graphemer();
  function encryptTranslate(str: string) {
    var newStr = ""

    for (const ch of str) {
      let emojis = codebook.encryptCodebook.get(ch)
      if (emojis != undefined) {
        let emojiIndex = Math.floor(Math.random() * codebook.scale)
        let emoji = emojis[emojiIndex]
        newStr += emoji
      }
    }

    return newStr
  }

  function decryptTranslate(str: string) {
    var newStr = ""

    for (const ch of splitter.splitGraphemes(str)) {
      let newChar = codebook.decryptCodebook.get(ch)
      if (newChar != undefined) {
        newStr += newChar
      }
    }

    return newStr
  }

  const key = CryptoJS.enc.Utf8.parse("ohouohouohouohou") //十六位十六进制数作为密钥
  const iv = CryptoJS.enc.Utf8.parse("ohouohouohouohou") //十六位十六进制数作为密钥偏移量

  // 解密方法
  function decrypt(text: string): string {
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
  function encrypt(text: string): string {
    if (text.length == 0) return ''
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
    decrypt,
    changeCodebookType,
    spotType
  }
}