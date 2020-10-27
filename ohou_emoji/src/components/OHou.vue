<template>
  <h1>🥳噢吼 Emoji🥳</h1>
  <div>
    <textarea
      v-model="state.fromStr"
      placeholder="输入需要加密的内容"
      autofocus="true"
    ></textarea>
  </div>

  <div class="btns">
    <div><button v-on:click="encryptText">加密⬇️</button> <br /></div>
    <div><button v-on:click="decryptText">解密⬆️</button> <br /></div>
  </div>

  <div>
    <textarea
      v-model="state.toStr"
      placeholder="输入需要解密的Emoji"
    ></textarea>
  </div>
</template>

<script>
import { reactive } from "vue"
import { Codebook } from "./Codebook.js"

export default {
  setup() {
    const state = reactive({
      fromStr: "",
      toStr: "",
    })

    const {
      encrypt,
      decrypt
    } = Codebook()

    //解密方法
    function decryptText() {
      state.fromStr = decrypt(state.toStr)
    }

    //加密方法
    function encryptText() {
      if (state.fromStr.length == 0) return
      state.toStr = encrypt(state.fromStr)
    }

    return {
      state,
      encryptText,
      decryptText,
    }
  },
}
</script>

<style>
textarea {
  width: 100%;
  height: 150px;
}

.btns {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>