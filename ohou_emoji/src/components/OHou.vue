<template>
  <div id="ohou">
    <h1>🥳噢吼 Emoji🥳</h1>
    <div class="content">
      <!-- 左边输入框 -->
      <div class="content_item input_box">
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
          @mouseenter="
            state.encryptBtnText = state.isSmallDevice
              ? btnTextSmall.encryptHoverText
              : btnText.encryptHoverText
          "
          @mouseleave="
            state.encryptBtnText = state.isSmallDevice
              ? btnTextSmall.encryptText
              : btnText.encryptText
          "
        >
          {{ state.encryptBtnText }}
        </div>

        <div
          class="btn"
          role="button"
          v-on:click="decryptText"
          @mouseenter="
            state.decryptBtnText = state.isSmallDevice
              ? btnTextSmall.decryptHoverText
              : btnText.decryptHoverText
          "
          @mouseleave="
            state.decryptBtnText = state.isSmallDevice
              ? btnTextSmall.decryptText
              : btnText.decryptText
          "
        >
          {{ state.decryptBtnText }}
        </div>
      </div>

      <!-- 右边输入框 -->
      <div class="content_item input_box">
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
import { reactive } from "vue";
import { Codebook } from "./Codebook.js";

export default {
  setup() {
    // 按钮文本
    const btnText = {
      encryptText: "> 加密 >",
      encryptHoverText: "> > > >",
      decryptText: "< 解密 <",
      decryptHoverText: "< < < <",
    };
    const btnTextSmall = {
      encryptText: "∨ 加密 ∨",
      encryptHoverText: "∨ ∨ ∨ ∨",
      decryptText: "∧ 解密 ∧",
      decryptHoverText: "∧ ∧ ∧ ∧",
    };

    const state = reactive({
      encryptBtnText: btnText.encryptText,
      decryptBtnText: btnText.decryptText,
      leftContent: "",
      rightContent: "",
      foot:
        "🥳😇🙃😄😱😩🤯🤫😜🙂😎😷😣😍😖😅😢😆😕😊🤬😥😷🙁😄😟🙂😞😰😋😗😨🥰😎😝🤪🤫🤣🤫😞😤🤗🙂😦😶🥳",
      isSmallDevice: false,
    });

    const { encrypt, decrypt } = Codebook();

    //解密方法
    function decryptText() {
      state.leftContent = decrypt(state.rightContent);
    }

    //加密方法
    function encryptText() {
      if (state.leftContent.length == 0) return;
      state.rightContent = encrypt(state.leftContent);
    }

    window.onresize = () => {
      if (document.body.clientWidth <= 500) {
        state.isSmallDevice = true;
      } else {
        state.isSmallDevice = false;
      }

      state.encryptBtnText = state.isSmallDevice
        ? btnTextSmall.encryptHoverText
        : btnText.encryptHoverText;
      state.encryptBtnText = state.isSmallDevice
        ? btnTextSmall.encryptText
        : btnText.encryptText;

      state.decryptBtnText = state.isSmallDevice
        ? btnTextSmall.decryptHoverText
        : btnText.decryptHoverText;

      state.decryptBtnText = state.isSmallDevice
        ? btnTextSmall.decryptText
        : btnText.decryptText;
    };

    return {
      btnText,
      btnTextSmall,
      state,
      encryptText,
      decryptText,
    };
  },
};
</script>

<style>
#ohou {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

@media all and (max-width: 500px) {
  .content {
    flex-grow: 1;
    margin: 1em 1em 0em 1em;
    height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
}

@media all and (min-width: 501px) {
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

  .content > div {
    height: 100%;
  }
}

.content_item {
  flex-grow: 2;
}

.input_box {
  display: flex;
  justify-content: center;
}

.text_input {
  resize: none;
  outline: none;
  box-sizing: border-box;
  font-size: 1.2em;
  padding: 0.5em;
  border: 0.1em solid #999;
  border-radius: 0.5em;
  transition: 0.3s;
  width: 100%;
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

@media all and (max-width: 500px) {
  .center_btns {
    flex-grow: 0;
    width: 100%;
    height: 8em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
}

@media all and (min-width: 501px) {
  .center_btns {
    flex-grow: 0;
    height: 100%;
    width: 8em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

.btn {
  user-select: none;
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