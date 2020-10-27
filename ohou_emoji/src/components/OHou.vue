<template>
  <div id="ohou">
    <h1>🥳噢吼 Emoji🥳</h1>
    <div class="content">
      <!-- 左边输入框 -->
      <div class="content_item left_input">
        <textarea
          class="text_input"
          v-model="state.leftContent"
          placeholder="输入需要加密的内容"
          autofocus="true"
        ></textarea>
      </div>

      <!-- 中间按钮 -->
      <div class="content_item center_btns">
        <div
          class="btn"
          role="button"
          v-on:click="encryptText"
          @mouseenter="state.encryptBtnText = btnText.encryptHoverText"
          @mouseleave="state.encryptBtnText = btnText.encryptText"
        >
          {{ state.encryptBtnText }}
        </div>

        <div
          class="btn"
          role="button"
          v-on:click="decryptText"
          @mouseenter="state.decryptBtnText = btnText.decryptHoverText"
          @mouseleave="state.decryptBtnText = btnText.decryptText"
        >
          {{ state.decryptBtnText }}
        </div>
      </div>

      <!-- 右边输入框 -->
      <div class="content_item right_input">
        <textarea
          class="text_input"
          v-model="state.rightContent"
          placeholder="输入需要解密的Emoji"
        ></textarea>
      </div>
    </div>
    <h6>{{ state.foot }}</h6>
  </div>
</template>

<script>
import { reactive } from "vue"
import { Codebook } from "./Codebook.js"

export default {
  setup() {
    // 按钮文本
    const btnText = {
      encryptText:      "> 加密 >",
      encryptHoverText: "> > > >",
      decryptText:      "< 解密 <",
      decryptHoverText: "< < < <",
    }
    
    const state = reactive({
      encryptBtnText: btnText.encryptText,
      decryptBtnText: btnText.decryptText,
      leftContent: "",
      rightContent: "",
      foot: "🥳😇🙃😄😱😩🤯🤫😜🙂😎😷😣😍😖😅😢😆😕😊🤬😥😷🙁😄😟🙂😞😰😋😗😨🥰😎😝🤪🤫🤣🤫😞😤🤗🙂😦😶🥳",
    })

    const { encrypt, decrypt } = Codebook()

    //解密方法
    function decryptText() {
      state.leftContent = decrypt(state.rightContent)
    }

    //加密方法
    function encryptText() {
      if (state.leftContent.length == 0) return
      state.rightContent = encrypt(state.leftContent)
    }

    return {
      btnText,
      state,
      encryptText,
      decryptText,
    }
  },
}
</script>

<style>
#ohou {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  flex-grow: 1;
  margin: 1em 1em 0em 1em;
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}

.content_item {
  flex-grow: 2;
  height: 100%;
}

.text_input {
  resize: none;
  outline: none;
  box-sizing: border-box;
  font-size: 1.2em;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  border: 0.1em solid #999;
  border-radius: 0.5em;
  transition: 0.3s;
}

.text_input:hover {
  padding: 0.5em;
  border: 0.1em solid #ffcd00;
  box-shadow: 0em 0em 0.1em #ffcd00;
}

.text_input:focus {
  padding: 0.4em;
  border: 0.2em solid #ffcd00;
  box-shadow: 0em 0em 0.2em #ffcd00;
}

.center_btns {
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.btn {
  user-select:none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1em solid #ddd;
  border-radius: 0.4em;
  width: 5em;
  height: 2em;
  text-align: center;
  margin: 1em 1em;
  transition: 0.3s;
}

.btn:active {
  animation: 0.3s ease-out btn_active_anim;
}

@keyframes btn_active_anim {
  from，to {
    transform: none;
  }
  50% {
    transform: scale(0.9);
  }
}

.btn:hover {
  border: 0.1em solid #ffcd00;
  box-shadow: 0em 0em 0.5em #ffcd00;
  background-color: #ffcd00;
  color: #fff;
}
</style>