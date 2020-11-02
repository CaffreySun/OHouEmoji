<template>
  <div id="ohou">
    <h1>{{ state.codebooksType }}噢吼 Emoji{{ state.codebooksType }}</h1>
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

        <div class="btn" role="button" v-on:click="state.selectingType = true">
          加密方式
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
    <div class="foot" style="margin: 0.5rem">
      ⚠️请注意：本工具的加密密钥公开在代码中，故无法保证您的数据安全，请谨慎使用⚠️<br>
      ⚠️使用本工具进行非法活动，后果自负⚠️
    </div>
    <TypeSelect
      v-bind:style="{ display: state.selectingType ? 'block' : 'none' }"
      v-bind:type="state.codebooksType"
      v-on:update:type="codebooksTypeChanged($event)"
    />
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import { Codebook } from "./Codebook";
import TypeSelect from "./TypeSelect.vue";

export default defineComponent({
  components: {
    TypeSelect,
  },

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
      isSmallDevice: false,
      selectingType: false,
      codebooksType: "🥳",
    });

    const { encrypt, decrypt, changeCodebookType, spotType } = Codebook();

    function codebooksTypeChanged(type: string) {
      state.selectingType = false;

      if (type == null) return;

      state.codebooksType = type;
      changeCodebookType(type);
    }

    //解密方法
    function decryptText() {
      const type = spotType(state.rightContent);
      if (type != null) {
        state.codebooksType = type;
        changeCodebookType(type);
      }
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
      codebooksTypeChanged,
    };
  },
});
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
    margin: 1rem 1rem 0rem 1rem;
    height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .content > div {
    width: 100%;
  }
}

@media all and (min-width: 501px) {
  .content {
    flex-grow: 1;
    padding: 1rem 1rem 0rem 1rem;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
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
  font-size: 1.2rem;
  padding: 0.5rem;
  border: 0.1rem solid #999;
  border-radius: 0.5rem;
  transition: 0.3s;
  width: 100%;
}

.text_input:hover {
  padding: 0.5rem;
  border: 0.1rem solid #ffcd00;
  box-shadow: 0rem 0rem 0.1rem #ffcd00;
}

.text_input:focus {
  padding: 0.4rem;
  border: 0.2rem solid #ffcd00;
  box-shadow: 0rem 0rem 0.2rem #ffcd00;
}

@media all and (max-width: 500px) {
  .center_btns {
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: top;
    width: 100%;
    height: 4rem;
    flex-direction: row;
  }
}

@media all and (min-width: 501px) {
  .center_btns {
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: top;
    height: 100%;
    width: 6rem;
    flex-direction: column;
  }
}

.btn {
  font-size: 0.8rem;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid #ddd;
  border-radius: 0.4rem;
  background-color: #fff;
  width: 4rem;
  height: 2rem;
  transition: 0.3s;
}

@media all and (max-width: 500px) {
  .btn {
    margin: 1rem 1rem 1rem 0rem;
  }
}

@media all and (min-width: 501px) {
  .btn {
    margin: 0rem 1rem 1rem 1rem;
  }
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
  border: 0.1rem solid #ffcd00;
  box-shadow: 0rem 0rem 0.5rem #ffcd00;
  background-color: #ffcd00;
  color: #fff;
}

.foot {
  font-size: 0.8rem;
}
</style>