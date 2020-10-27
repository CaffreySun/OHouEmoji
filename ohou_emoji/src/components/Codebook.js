import CryptoJS from "crypto-js"

export function Codebook() {
  const smileysTag = "🥳"
  const smileysEncryptCodebook = {
    a: "😀",
    b: "😃",
    c: "😄",
    d: "😁",
    e: "😆",
    f: "😅",
    g: "😂",
    h: "🤣",
    i: "😯",
    j: "😊",
    k: "😇",
    l: "🙂",
    m: "🙃",
    n: "😉",
    o: "😌",
    p: "😍",
    q: "🥰",
    r: "😘",
    s: "😗",
    t: "😙",
    u: "😚",
    v: "😋",
    w: "😛",
    x: "😝",
    y: "😜",
    z: "🤪",
    A: "🧐",
    B: "🤓",
    C: "😎",
    D: "🤩",
    E: "🤒",
    F: "😏",
    G: "😒",
    H: "😞",
    I: "😔",
    J: "😟",
    K: "😕",
    L: "🙁",
    M: "😦",
    N: "😣",
    O: "😖",
    P: "😫",
    Q: "😩",
    R: "🥺",
    S: "😢",
    T: "😭",
    U: "😤",
    V: "😠",
    W: "😡",
    X: "🤬",
    Y: "🤯",
    Z: "😳",
    1: "🥵",
    2: "😷",
    3: "😱",
    4: "😨",
    5: "😰",
    6: "😥",
    7: "😓",
    8: "🤗",
    9: "🤔",
    0: "🤭",
    "/": "🤫",
    "+": "🤥",
    "=": "😶",
  }
  const smileysDecryptCodebook = {
    "😀": "a",
    "😃": "b",
    "😄": "c",
    "😁": "d",
    "😆": "e",
    "😅": "f",
    "😂": "g",
    "🤣": "h",
    "😯": "i",
    "😊": "j",
    "😇": "k",
    "🙂": "l",
    "🙃": "m",
    "😉": "n",
    "😌": "o",
    "😍": "p",
    "🥰": "q",
    "😘": "r",
    "😗": "s",
    "😙": "t",
    "😚": "u",
    "😋": "v",
    "😛": "w",
    "😝": "x",
    "😜": "y",
    "🤪": "z",
    "🧐": "A",
    "🤓": "B",
    "😎": "C",
    "🤩": "D",
    "🤒": "E",
    "😏": "F",
    "😒": "G",
    "😞": "H",
    "😔": "I",
    "😟": "J",
    "😕": "K",
    "🙁": "L",
    "😦": "M",
    "😣": "N",
    "😖": "O",
    "😫": "P",
    "😩": "Q",
    "🥺": "R",
    "😢": "S",
    "😭": "T",
    "😤": "U",
    "😠": "V",
    "😡": "W",
    "🤬": "X",
    "🤯": "Y",
    "😳": "Z",
    "🥵": "1",
    "😷": "2",
    "😱": "3",
    "😨": "4",
    "😰": "5",
    "😥": "6",
    "😓": "7",
    "🤗": "8",
    "🤔": "9",
    "🤭": "0",
    "🤫": "/",
    "🤥": "+",
    "😶": "=",
  }

  function translate(str, codebook, hasTag) {
    var newStr = ""
    var tagCount = 0
    for (const ch of str) {
      if (hasTag) {
        if (ch == smileysTag) tagCount++
        if (tagCount >= 2) break
      }

      let newChar = codebook[ch]

      if (newChar !== null && newChar != undefined && newChar.length != 0) {
        newStr += newChar
      }
    }

    return newStr
  }

  const key = CryptoJS.enc.Utf8.parse("ohouohouohouohou") //十六位十六进制数作为密钥
  const iv = CryptoJS.enc.Utf8.parse("ohou") //十六位十六进制数作为密钥偏移量

  //解密方法
  function decrypt(text) {
    let transText = translate(
      text,
      smileysDecryptCodebook,
      true
    )
    let decrypt = CryptoJS.AES.decrypt(transText, key, {
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

    let cntStr = encrypted.ciphertext.toString(CryptoJS.enc.Base64)
    let ohouEmoji = translate(cntStr,smileysEncryptCodebook, false)

    return smileysTag + ohouEmoji + smileysTag
  }

  return {
    encrypt,
    decrypt
  }
}